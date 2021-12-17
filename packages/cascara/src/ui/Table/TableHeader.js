import React from 'react';
import styles from './Table.module.scss';

import { Boundaries } from '../../system-components';
import data from '@espressive/icons/arrow-down';

// Note that this component is memoized with a deep equal using Ramda. See export.
const TableHeader = ({ dataDisplay, isRowActionable = false }) => {
  const displayColumns = dataDisplay?.map((column) => {
    // Check the configuration for each dataDisplay object in the array
    if (
      // Only warn during development
      process.env.NODE_ENV === 'development' &&
      // Make sure that the attribute is undefined
      column.isLabeled !== undefined
    ) {
      console.warn(
        'The dataDisplay configuration for "' +
          column.attribute +
          '" contains "isLabeled" which is not supported in Table.'
      );
    }

    return (
      <th className={styles.HeadCell} key={column.attribute}>
        {column.label}
      </th>
    );
  });

  const actionColumn = isRowActionable && (
    <th className={styles.HeadCell} key={'action-bar-slot'} />
  );

  const headerCells = [...displayColumns, actionColumn];

  return (
    <Boundaries>
      <thead className={styles.HeadContainer}>
        <tr className={styles.Row}>{headerCells}</tr>
      </thead>
    </Boundaries>
  );
};

export default TableHeader;
