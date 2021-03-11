import React, { useContext } from 'react';
import styles from './Table.module.scss';

import ErrorBoundary from '../../shared/ErrorBoundary';
import { ModuleContext } from '../../modules/context';

const TableHeader = () => {
  // FDS-164: table header not adding an extra column for actions
  // when new prop actions is passed.
  const { modules, dataConfig = {} } = useContext(ModuleContext);
  const safeActionList = modules || dataConfig?.actions || [];
  const headerCells = dataConfig?.display?.map((column) => (
    <th className={styles.HeadCell} key={column.attribute}>
      {column.label}
    </th>
  ));

  if (safeActionList.length) {
    headerCells.push(
      <th className={styles.HeadCell} key={'action-bar-slot'} />
    );
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
