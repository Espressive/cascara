import React from 'react';
import pt from 'prop-types';
import styles from './Table.module.scss';

import ErrorBoundary from '../../shared/ErrorBoundary';
import TableProvider from './context/TableProvider';

import TableHeader from './TableHeader';
import TableBody from './TableBody';

import { actionModules, dataModules } from '../../modules/ModuleKeys';

const actionModuleOptions = Object.keys(actionModules);
const dataModuleOptions = Object.keys(dataModules);

const propTypes = {
  /** Actions will be appended to each row, they'll appear as buttons. */
  actions: pt.shape({
    actionButtonMenuIndex: pt.number,

    modules: pt.arrayOf(
      pt.shape({
        module: pt.oneOf(actionModuleOptions).isRequired,
      })
    ),

    // Resolve record actions.
    // A function that returns the actions available to the current row
    resolveRecordActions: pt.func,
  }),

  // An array of objects.
  //
  // Every object in this array will potencially be rendered as a table row.
  data: pt.arrayOf(pt.shape({})),

  // DEPRECATED: The main configuration for your table. Here you can specify the columns to display
  // as well as the available actions (if any) for each row.
  dataConfig: pt.shape({
    /** DEPRECATED - use actions instead */
    actionButtonMenuIndex: pt.number,

    /** DEPRECATED - use actions instead */
    actions: pt.arrayOf(
      pt.shape({
        module: pt.oneOf(actionModuleOptions).isRequired,
      })
    ),

    /** DEPRECATED dataDisplay instead */
    display: pt.arrayOf(
      pt.shape({
        module: pt.oneOf(dataModuleOptions).isRequired,
      })
    ),
  }),

  /** Here you can describe each of the visible columns in your table. */
  dataDisplay: pt.arrayOf(
    pt.shape({
      module: pt.oneOf(dataModuleOptions).isRequired,
    })
  ),

  // Event handler.
  //
  // An event handler you can pass to handle every event your table emits.
  onAction: pt.func,

  // Resolve record actions.
  // A function that returns the actions available to the current row
  resolveRecordActions: pt.func,

  // Unique ID Attribute.
  //
  // specifies the attribute that uniquely identifies every object in the 'data' array.
  uniqueIdAttribute: pt.string,
};

/** This is a Table */
const Table = ({
  actions,
  data,
  dataConfig,
  dataDisplay,
  onAction,
  uniqueIdAttribute,
  ...rest
}) => {
  // TODO: When we officially deprecate dataDisplay, this logic can go away.
  const display =
    dataDisplay ||
    dataConfig?.display ||
    // If no dataDisplay is being set, we should try to infer the type from values on the first object in `data` and then create a dataDisplay config with module types
    (Array.isArray(data) && data.length > 0)
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
            default:
              column.module = 'text';
              break;
          }

          return column;
        })
      : [];

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

  // FDS-187: render nothing if no data nor columns
  return (
    <ErrorBoundary>
      <TableProvider
        value={{
          actionButtonMenuIndex,
          data,
          dataDisplay: display,
          modules,
          onAction,
          resolveRecordActions,
          uniqueIdAttribute,
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
    </ErrorBoundary>
  );
};

Table.propTypes = propTypes;

export { propTypes };
export default Table;
