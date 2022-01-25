import React, { useContext, useMemo } from 'react';
import styles from './TableOld.module.scss';

import { Boundaries } from '../../atoms';
import { ModuleContext } from '../../modules/context';

const TableHeader = () => {
  // FDS-164: table header not adding an extra column for actions
  // when new prop actions is passed.
  const { dataDisplay, isRowSelectable, modules } = useContext(ModuleContext);
  const headerCells = useMemo(
    () =>
      dataDisplay?.map((column) => (
        <th className={styles.HeadCell} key={column.attribute}>
          {column.label}
        </th>
      )) || [],
    [dataDisplay]
  );

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
        <tr className={styles.Row}>{newHeaderCells}</tr>
      </thead>
    </Boundaries>
  );
};

export default TableHeader;
