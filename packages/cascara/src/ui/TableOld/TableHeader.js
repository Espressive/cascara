import React, { useContext } from 'react';
import styles from './TableOld.module.scss';

import { Boundaries } from '../../system-components';
import { ModuleContext } from '../../modules/context';

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
      <th className={styles.HeadCell} key={'selection-toggle-slot'} />
    );
  }

  return (
    <Boundaries>
      <thead className={styles.HeadContainer}>
        <tr className={styles.RowOld}>{newHeaderCells}</tr>
      </thead>
    </Boundaries>
  );
};

export default TableHeader;