import React, { useCallback, useMemo, useReducer, useState } from 'react';
// import pt from 'prop-types';
import styles from './Table.module.scss';
import { TABLE_SHAPE } from './__propTypes';
import TableProviderOld from './context/TableProvider';

import selectionReducer, { SELECT, UNSELECT } from './state/selectionReducer';
import sortingReducer, {
  RESET as RESET_SORT,
  SORT,
} from './state/sortingReducer';

import TableHeaderOld from './TableHeader';
import TableBodyOld from './TableBody';
import { ascend, descend, prop, sortWith } from 'ramda';

// [fix] FDS-284: uniqueIdAttribute is always derived as undefined even though is correctly passed
// NOTE: we could have an workaround by adding `number` to this list, but that would have not resolved the real bug.
const UUID_PRIORITY_KEYS = ['eid', 'uuid', 'id', 'sys_date_created', 'number'];

const inferUniqueID = (objectKeys) => {
  for (const key of UUID_PRIORITY_KEYS) {
    if (objectKeys.includes(key)) {
      return key;
    }
  }
  return undefined;
};

const inferDataDisplay = (data) =>
  Array.isArray(data) && data.length > 0
    ? Object.entries(data[0]).map(([attribute, value]) => {
        const dataType = typeof value;
        const column = {
          attribute,
          label: attribute,
          module: dataType,
        };

        switch (dataType) {
          case 'boolean':
            column.module = 'checkbox';
            break;
          case 'array':
            column.module = 'json';
            break;
          case 'object':
            column.module = 'json';
            break;
          default:
            column.module = 'text';
            break;
        }

        return column;
      })
    : undefined;

const TableBase = ({
  actions,
  data,
  dataConfig,
  dataDisplay,
  onAction,
  selections,
  sortable,
  uniqueIdAttribute,
  ...rest
}) => {
  const [sortableColumns] = useState(() => {
    let sortableColumns = [];

    /** multiple column sort */
    if (Array.isArray(sortable) && sortable.length) {
      sortableColumns = [...sortable];
    }

    /** single column sort */
    if (typeof sortable === 'string') {
      sortableColumns.push(sortable);
    }

    /** all columns flag */
    if (typeof sortable === 'boolean' && sortable) {
      sortableColumns = dataDisplay.map((header) => header.attribute);
    }

    return sortableColumns;
  });

  const [sortState, dispatchSortAction] = useReducer(sortingReducer);

  const sortRecordsBy = useCallback(
    (attribute) => {
      const newSortState = {
        ...sortState,
        attribute,
        // if same attribute, circle between -1 (descend), 0 (unsort) and 1 (ascend)
        order:
          sortState.attribute === attribute
            ? sortState.order === 1
              ? -1
              : sortState.order + 1
            : 1,
      };

      dispatchSortAction({ payload: newSortState, type: SORT });
    },
    [sortState]
  );

  const unsortRecords = useCallback(() => {
    dispatchSortAction({ type: RESET_SORT });
  }, []);

  // Row selection
  const isRowSelectable = Boolean(selections);
  const maxSelection = isRowSelectable ? selections?.max || 0 : 0;
  const [selection, updateSelection] = useReducer(selectionReducer, []);

  // get a list of record IDs
  const recordIDs = useMemo(
    () =>
      data && uniqueIdAttribute
        ? data.map((record) => record[uniqueIdAttribute])
        : [],
    [data, uniqueIdAttribute]
  );

  /**
   * Select row(s)
   *
   * @param {String|Array[String]} rowID
   */
  const rowSelect = useCallback(
    (rowID) => {
      if (maxSelection && selection.length >= maxSelection) {
        return;
      }

      updateSelection({
        payload: rowID,
        type: SELECT,
      });

      onAction &&
        onAction({ name: 'select', selection: [...selection, rowID] });
    },
    [maxSelection, onAction, selection]
  );

  /**
   * Unselect row(s)
   *
   * @param {String|Array[String]} rowID
   */
  const rowUnselect = useCallback(
    (rowID) => {
      updateSelection({
        payload: rowID,
        type: UNSELECT,
      });

      onAction &&
        onAction({ name: 'unselect', selection: [...selection, rowID] });
    },
    [onAction, selection]
  );

  // TODO: When we officially deprecate dataDisplay, the second or case can go away
  const display =
    dataDisplay ||
    dataConfig?.display ||
    // If no dataDisplay is being set, we should try to infer the type from values on the first object in `data` and then create a dataDisplay config with module types
    inferDataDisplay(data);

  // [fix] FDS-284: uniqueIdAttribute is always derived as undefined even though is correctly passed
  const uniqueID = uniqueIdAttribute
    ? uniqueIdAttribute
    : data
    ? inferUniqueID(Object.keys(data[0]))
    : undefined;

  // FDS-518: sort table records
  const sortedData = useMemo(() => {
    if (!sortState.attribute || sortState.order === 0) {
      return data;
    }

    const sortData = sortWith([
      sortState.order === -1
        ? descend(prop(sortState.attribute))
        : ascend(prop(sortState.attribute)),
    ]);

    const sortedData = sortData(data);

    return sortedData;
  }, [data, sortState]);

  // FDS-142: new action props
  let actionButtonMenuIndex = actions?.actionButtonMenuIndex;
  let modules = actions?.modules;
  const resolveRecordActions = actions?.resolveRecordActions;

  // old action props
  const unwantedActions = dataConfig?.actions;
  if (unwantedActions) {
    modules = unwantedActions;
    // eslint-disable-next-line no-console -- we need to let developers know about this error
    console.warn(
      'Prop "dataConfig.actions" has been deprecated. Actions have been moved to the root of the Table component as their own prop.'
    );
  }

  const unwantedActionButtonIndex = dataConfig?.actionButtonMenuIndex;
  if (unwantedActionButtonIndex) {
    actionButtonMenuIndex = unwantedActionButtonIndex;
    // eslint-disable-next-line no-console -- we need to let developers know about this error
    console.warn(
      'Prop "dataConfig.actionButtonIndex" has been deprecated. Actions have been moved to the root of the Table component as their own prop.'
    );
  }

  const unwantedDataConfig = dataConfig;
  if (unwantedDataConfig) {
    // eslint-disable-next-line no-console -- we need to let developers know about this error
    console.warn(
      'Parameters inside the dataConfig object have been moved to different locations. Please see the `actions` and `dataDisplay` props instead. This prop will no longer work in the next minor release.'
    );
  }

  let columnCount = display?.length;

  if (modules?.length) {
    columnCount++;
  }

  if (isRowSelectable) {
    columnCount++;
  }

  return (
    <TableProviderOld
      value={{
        actionButtonMenuIndex,
        data: sortedData,
        dataDisplay: display,
        isRowSelectable,
        maxSelection,
        modules,
        onAction,
        recordIDs,
        resolveRecordActions,
        rowSelect,
        rowUnselect,
        selection,
        sortRecordsBy,
        sortableColumns,
        uniqueIdAttribute: uniqueID,
        unsortRecords,
      }}
      {...rest}
    >
      <table
        className={styles.Table}
        data-component='Table'
        style={{
          gridTemplateColumns: `repeat(${columnCount}, auto)`,
        }}
      >
        <TableHeaderOld />
        <TableBodyOld />
      </table>
    </TableProviderOld>
  );
};

TableBase.propTypes = TABLE_SHAPE;

export default TableBase;
