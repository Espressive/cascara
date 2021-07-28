import React, { useContext } from 'react';

import styles from './Table.module.scss';
import ErrorBoundary from '../../private/ErrorBoundary';
import { ModuleContext } from '../../modules/context';

const TableFooter = () => {
  const { dataDisplay } = useContext(ModuleContext);
  const headerCells = dataDisplay?.map((column) => (
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
