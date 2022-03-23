import React, { useCallback, useMemo, useReducer } from 'react';
// import pt from 'prop-types';
import styles from './Table.module.scss';
import { TABLE_SHAPE } from './__propTypes';
import TableProviderOld from './context/TableProvider';

import selectionReducer, { SELECT, UNSELECT } from './state/selectionReducer';
import sortingReducer, {
  INITIAL_STATE,
  SORT,
  SORT_ORDER,
} from './state/sortingReducer';

import TableHeaderOld from './TableHeader';
import TableBodyOld from './TableBody';
import { ascend, descend, prop, sortWith } from 'ramda';

// [fix] FDS-284: uniqueIdAttribute is always derived as undefined even though is correctly passed
// NOTE: we could have an workaround by adding `number` to this list, but that would have not resolved the real bug.
const UUID_PRIORITY_KEYS = ['eid', 'uuid', 'id', 'sys_date_created', 'number'];

const inferUniqueid = (objectKeys) => {
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
  initialSort,
  onAction,
  selections,
  sortable,
  uniqueIdAttribute,
  ...rest
}) => {
  const visibleColumns = useMemo(
    () =>
      Array.isArray(dataDisplay)
        ? dataDisplay.map((column) => column.attribute)
        : inferDataDisplay(data),
    [data, dataDisplay]
  );

  /**
   * Sortable prop can have 3 different values:
   *
   * - Boolean, to make all columns sortable
   * - String, to make a single column sortable
   * - Array[String], to make multiple columns sortable
   */
  const sortableColumns = useMemo(() => {
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
  }, [dataDisplay, sortable]);

  // Create sort state
  const [sortState, dispatchSortAction] = useReducer(
    sortingReducer,
    initialSort || INITIAL_STATE
  );

  // Sort records
  const sortRecordsBy = useCallback((attribute) => {
    dispatchSortAction({ payload: attribute, type: SORT });
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

  // FDS-518: sort table records
  const sortedData = useMemo(() => {
    // Do not sort if sorting column is hidden
    if (!visibleColumns.includes(sortState.attribute)) {
      return data;
    }

    // do not sort if not initial state
    if (!sortState.attribute || sortState.order === SORT_ORDER.UNSORTED) {
      return data;
    }

    const sortData = sortWith([
      sortState.order === SORT_ORDER.ASCENDING
        ? ascend(prop(sortState.attribute))
        : descend(prop(sortState.attribute)),
    ]);

    const sortedData = sortData(data);

    return sortedData;
  }, [data, sortState.attribute, sortState.order, visibleColumns]);

  // [fix] FDS-284: uniqueIdAttribute is always derived as undefined even though is correctly passed
  const uniqueid = uniqueIdAttribute
    ? uniqueIdAttribute
    : data
    ? inferUniqueid(Object.keys(sortedData[0]))
    : undefined;

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
        sortState,
        sortableColumns,
        uniqueIdAttribute: uniqueid,
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
