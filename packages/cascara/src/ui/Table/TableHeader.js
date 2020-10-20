import React, { useContext } from 'react';
import styles from './Table.module.scss';

import ErrorBoundary from '../../shared/ErrorBoundary';
import { ModuleContext } from '../../modules/context';

const TableHeader = () => {
  const { dataConfig } = useContext(ModuleContext);
  const headerCells = dataConfig.display.map((column) => (
    <th key={column.attribute}>{column.label}</th>
  ));

  if (dataConfig.actions && dataConfig.actions.length) {
    headerCells.push(<th key={'action-bar-slot'} />);
  }

  return (
    <ErrorBoundary>
      <thead className={styles.HeadContainer}>
        <tr className={styles.Row}>{headerCells}</tr>
      </thead>
    </ErrorBoundary>
  );
};

export default TableHeader;
