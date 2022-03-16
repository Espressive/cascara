import React, { useContext, useMemo } from 'react';
import styles from './Table.module.scss';

import Boundaries from '../../atoms/Boundaries';
import SortableHeader from './atoms/SortableHeader';
import { ModuleContext } from '../../modules/context';

const TableHeader = () => {
  // FDS-164: table header not adding an extra column for actions
  // when new prop actions is passed.
  const {
    dataDisplay,
    isRowSelectable,
    modules,
    sortRecordsBy,
    sortState,
    sortableColumns,
  } = useContext(ModuleContext);
  const headerCells = useMemo(
    () =>
      dataDisplay?.map((column) => {
        const isSortingEnabledForThisColumn = sortableColumns.includes(
          column.attribute
        );
        const isSortAttribute = sortState.attribute === column.attribute;

        return (
          <SortableHeader
            attribute={column.attribute}
            isSortAttribute={isSortAttribute}
            isSortable={isSortingEnabledForThisColumn}
            key={column.attribute}
            label={column.label}
            onSort={sortRecordsBy}
            sortState={sortState}
          />
        );
      }) || [],
    [dataDisplay, sortRecordsBy, sortState, sortableColumns]
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
