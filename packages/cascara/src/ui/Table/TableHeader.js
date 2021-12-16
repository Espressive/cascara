import React, { useContext } from 'react';
import styles from './Table.module.scss';

import { Boundaries } from '../../system-components';
import { ModuleContext } from '../../modules/context';

const TableHeader = () => {
  const { dataDisplay, modules } = useContext(ModuleContext);

  const displayColumns =
    dataDisplay?.map((column) => (
      <th className={styles.HeadCell} key={column.attribute}>
        {column.label}
      </th>
    )) || [];

  const actionSpacer = modules
    ? [<th className={styles.HeadCell} key={'action-bar-slot'} />]
    : [];

  const headerCells = [...displayColumns, ...actionSpacer];

  return (
    <Boundaries>
      <thead className={styles.HeadContainer}>
        <tr className={styles.Row}>{headerCells}</tr>
      </thead>
    </Boundaries>
  );
};

export default TableHeader;
