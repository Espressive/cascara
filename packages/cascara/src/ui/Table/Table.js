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
  data: pt.arrayOf(pt.shape({})),
  dataConfig: pt.shape({
    actions: pt.arrayOf(
      pt.oneOfType([pt.shape(actionButtonPT), pt.shape(actionEditPT)])
    ),
    display: pt.shape({
      module: pt.oneOf(actionModuleOptions).isRequired,
    }).isRequired,
  }),
  onAction: pt.func,
  uniqueIdAttribute: pt.string,
};

/** This is a Table */
const Table = ({
  data,
  dataConfig,
  // eslint-disable-next-line no-console
  onAction = (type, data) => console.log(`Action ${type}:`, data),
  uniqueIdAttribute = 'eid',
  ...rest
}) => {
  const { actions, display } = dataConfig;
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
