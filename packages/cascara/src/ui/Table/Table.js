import React from 'react';
import pt from 'prop-types';
import styles from './Table.module.scss';

import ErrorBoundary from '../../shared/ErrorBoundary';
import TableProvider from './context/TableProvider';

import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';

// Action modules
import { propTypes as actionButtonPT } from '../../modules/ActionButton';
import { propTypes as actionEditPT } from '../../modules/ActionEdit';

// Data modules
import { actionModules } from '../../modules/ModuleKeys';

const actionModuleOptions = Object.keys(actionModules);

const propTypes = {
  /** An array of objects.
   *
   * Every object in this array will potencially be rendered as a table row.
   *
   * The shape is up to you, the only requirement is that every objecct(row)
   * must have an attribute that uniquely identifies the object in the array.
   *
   * We call this attribute `uniqueIdAttribute`, which you will be able to specify
   * later on. */
  data: pt.arrayOf(pt.shape({})),

  /** The main configuration for your table. Here you can specify the columns to display
   * as well as the available actions (if any) for each row. */
  dataConfig: pt.shape({
    /** Actions will be appended to each row, they'll appear as buttons.
     *
     * Contrary to the objects in 'data', the shape of these is more opinionated.
     *
     * Actions can be of two types (for now...), the first and most common is 'button',
     * which emits an 'action' event. But if your data is editable, the second option
     * 'edit' will do the trick. */
    actions: pt.arrayOf(
      pt.oneOfType([pt.shape(actionButtonPT), pt.shape(actionEditPT)])
    ),

    /** Here you can describe each of the visible columns in your table.
     *
     * Display items have a special shape too, good news is that you have plenty
     * more options to choose from. Please choose the one that best fits your data type. */
    display: pt.arrayOf(
      pt.shape({
        module: pt.oneOf(actionModuleOptions).isRequired,
      })
    ),
  }),

  /** Event handler.
   *
   * An event handler you can pass to handle every event your table emits.
   * Every event carries two pieces of information:
   *
   * Target, the object that was actually clicked and
   * Record, the object that represents the row upon which the action was applied. */
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
        value={{ data, dataConfig, onAction, uniqueIdAttribute }}
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
          <TableFooter />
        </table>
      </TableProvider>
    </ErrorBoundary>
  );
};

Table.propTypes = propTypes;

export default Table;
