import React from 'react';
import { filter, has } from 'ramda';
import pt from 'prop-types';
import styles from './Table.module.scss';

import { Boundaries } from '../../system-components';
import { useDeveloperMessage } from '../../hooks';

const propTypes = {
  dataDisplay: pt.arrayOf(pt.object),
  isRowActionable: pt.bool,
};

// Note that this component is memoized with a deep equal using Ramda. See export.
const TableHeader = ({ dataDisplay, isRowActionable = false }) => {
  // Make sure that none of our dataDisplay objects are using isLabeled
  const isUsingInvalidLabel = filter(has('isLabeled'), dataDisplay).length;

  useDeveloperMessage(
    isUsingInvalidLabel,
    `A dataDisplay configuration contains "isLabeled" which is not supported in Table.`
  );

  const displayColumns = dataDisplay?.map((column) => {
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

TableHeader.propTypes = propTypes;

export default TableHeader;
