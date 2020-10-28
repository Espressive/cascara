import React, { useContext } from 'react';

import styles from './Table.module.scss';
import ErrorBoundary from '../../shared/ErrorBoundary';
import { ModuleContext } from '../../modules/context';

const TableFooter = () => {
  const { dataConfig } = useContext(ModuleContext);
  const headerCells = dataConfig?.display.map((column) => (
    <th key={column.attribute}>{column.label}</th>
  ));

  return (
    <ErrorBoundary>
      <tfoot className={styles.FootContainer}>
        <tr className={styles.Row} key={'foot-header'}>
          {headerCells}
        </tr>
      </tfoot>
    </ErrorBoundary>
  );
};

export default TableFooter;
