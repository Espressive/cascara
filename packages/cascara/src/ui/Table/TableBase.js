import React from 'react';
// import pt from 'prop-types';
import styles from './Table.module.scss';
import { propTypes as tablePropTypes } from './Table';
import TableProvider from './context/TableProvider';

import TableHeader from './TableHeader';
import TableBody from './TableBody';

const UUID_PRIORITY_KEYS = ['eid', 'uuid', 'id', 'sys_date_created'];

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

const propTypes = {
  ...tablePropTypes,
};

const TableBase = ({
  actions,
  data,
  dataConfig,
  dataDisplay,
  onAction,
  uniqueIdAttribute,
  ...rest
}) => {
  // TODO: When we officially deprecate dataDisplay, the second or case can go away
  const display =
    dataDisplay ||
    dataConfig?.display ||
    // If no dataDisplay is being set, we should try to infer the type from values on the first object in `data` and then create a dataDisplay config with module types
    inferDataDisplay(data);

  const uniqueID =
    uniqueIdAttribute || data ? inferUniqueID(Object.keys(data[0])) : undefined;

  // // FDS-142: new action props
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

  return (
    <TableProvider
      value={{
        actionButtonMenuIndex,
        data,
        dataDisplay: display,
        modules,
        onAction,
        resolveRecordActions,
        uniqueIdAttribute: uniqueID,
      }}
      {...rest}
    >
      <table
        className={styles.Table}
        style={{
          gridTemplateColumns: `repeat(${columnCount}, auto)`,
        }}
      >
        <TableHeader />
        <TableBody />
      </table>
    </TableProvider>
  );
};

TableBase.propTypes = propTypes;

export { propTypes };
export default TableBase;
