import React, { useContext } from 'react';
import styles from './Table.module.scss';

import { ModuleContext } from '../../modules/context';
import ErrorBoundary from '../../private/ErrorBoundary';
import SelectionToggle from './atoms/SelectionToggle';

const TableHeader = () => {
  // FDS-164: table header not adding an extra column for actions
  // when new prop actions is passed.
  const { dataDisplay, isRowSelectable, modules } = useContext(ModuleContext);
  const headerCells =
    dataDisplay?.map((column) => (
      <th className={styles.HeadCell} key={column.attribute}>
        {column.label}
      </th>
    )) || [];

  const actionBarSpacer = modules
    ? [<th className={styles.HeadCell} key={'action-bar-slot'} />]
    : [];

  const newHeaderCells = [...headerCells, ...actionBarSpacer];

  if (isRowSelectable) {
    newHeaderCells.unshift(
      <th className={styles.HeadCell} key={'selection-toggle-slot'}>
        <SelectionToggle id={'__ALL__'} />
      </th>
    );
  }

  return (
    <ErrorBoundary>
      <thead className={styles.HeadContainer}>
        <tr className={styles.Row}>{newHeaderCells}</tr>
      </thead>
    </ErrorBoundary>
  );
};

export default TableHeader;
