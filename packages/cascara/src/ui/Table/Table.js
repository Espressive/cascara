import React from 'react';
import pt from 'prop-types';
import styles from './Table.module.scss';

import ErrorBoundary from '../../shared/ErrorBoundary';
import TableProvider from './context/TableProvider';

import TableHeader from './TableHeader';
import TableBody from './TableBody';

import { actionModules, dataModules } from '../../modules/ModuleKeys';
import { tableActionModules } from './modules';

const bundledActionModules = {
  ...actionModules,
  ...tableActionModules,
};
const actionModuleOptions = Object.keys(bundledActionModules);
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

  // The main configuration for your table. Here you can specify the columns to display
  // as well as the available actions (if any) for each row.
  dataConfig: pt.shape({
    actionButtonMenuIndex: pt.number,

    /** Actions will be appended to each row, they'll appear as buttons. */
    actions: pt.arrayOf(
      pt.shape({
        module: pt.oneOf(actionModuleOptions).isRequired,
      })
    ),

    /** Here you can describe each of the visible columns in your table. */
    display: pt.arrayOf(
      pt.shape({
        module: pt.oneOf(dataModuleOptions).isRequired,
      })
    ),
  }).isRequired,

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
  onAction,
  uniqueIdAttribute,
  ...rest
}) => {
  const display = dataConfig?.display;

  // // FDS-142: new action props
  let actionButtonMenuIndex = actions?.actionButtonMenuIndex;
  let modules = actions?.modules;
  const resolveRecordActions = actions?.resolveRecordActions;

  // old action props
  const unwantedActions = dataConfig?.actions;
  if (unwantedActions) {
    modules = unwantedActions;
    // eslint-disable-next-line no-console
    console.warn(
      'Prop "dataConfig.actions" has been deprecated. Actions have been moved to the root of the Table component as their own prop.'
    );
  }

  const unwantedActionButtonIndex = dataConfig?.actionButtonMenuIndex;
  if (unwantedActionButtonIndex) {
    actionButtonMenuIndex = unwantedActionButtonIndex;
    // eslint-disable-next-line no-console
    console.warn(
      'Prop "dataConfig.actionButtonIndex" has been deprecated. Actions have been moved to the root of the Table component as their own prop.'
    );
  }

  let columnCount = display.length;

  if (modules.length) {
    columnCount++;
  }

  return (
    <ErrorBoundary>
      <TableProvider
        value={{
          actionButtonMenuIndex,
          data,
          dataConfig,
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

export default Table;
