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
  /** An array of objects.
   *
   * Every object in this array will potencially be rendered as a table row. */
  data: pt.arrayOf(pt.shape({})),

  /** The main configuration for your table. Here you can specify the columns to display
   * as well as the available actions (if any) for each row. */
  dataConfig: pt.shape({
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
  }),

  /** Event handler.
   *
   * An event handler you can pass to handle every event your table emits.*/
  onAction: pt.func,

  /** Unique ID Attribute.
   *
   * specifies the attribute that uniquely identifies every object in the 'data' array. */
  uniqueIdAttribute: pt.string,
};

/** This is a Table */
const Table = ({
  data = [],
  dataConfig = {},
  onAction = (type, data) => type,
  uniqueIdAttribute,
  ...rest
}) => {
  const { actions = [], display = [] } = dataConfig;
  let columnCount = display.length;

  if (actions.length) {
    columnCount++;
  }

  return (
    <ErrorBoundary>
      <TableProvider
        value={{
          data,
          dataConfig,
          onAction,
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
