import React, { useCallback } from 'react';
import pt from 'prop-types';
import { Role } from 'reakit';
import cx from 'classnames';

import styles from '../Table.module.scss';
import { SORT_ORDER } from '../state/sortingReducer';

const propTypes = {
  attribute: pt.string,
  isSortAttribute: pt.bool,
  isSortable: pt.bool,
  label: pt.string,
  sortState: pt.shape({
    sortAttribute: pt.string,
    sortOrder: pt.string,
    sortRecordsBy: pt.func,
  }),
};

const SortableHeader = ({
  attribute,
  isSortable,
  isSortAttribute,
  label,
  sortState,
}) => {
  const isColumnSorted = sortState?.sortAttribute === attribute;
  const headerClass = cx(styles.HeadCell, {
    [styles.SortedColumn]: isColumnSorted,
  });
  const className = cx('SortArrow', {
    [styles.SortArrowDown]:
      isSortAttribute && sortState?.sortOrder === SORT_ORDER.DESCENDING,
    [styles.SortArrowUp]:
      isSortAttribute && sortState?.sortOrder === SORT_ORDER.ASCENDING,
    [styles.SortInactive]:
      !isSortAttribute || sortState?.sortOrder === SORT_ORDER.UNSORTED,
  });

  /** Handle DOM element click */
  const handleHeaderClick = useCallback(() => {
    if (isSortable) {
      sortState.sortRecordsBy(attribute);
    }
  }, [attribute, isSortable, sortState]);

  return (
    <th className={headerClass} key={attribute} onClick={handleHeaderClick}>
      {label} {isSortable && <Role className={className} />}
    </th>
  );
};

SortableHeader.propTypes = propTypes;

export default SortableHeader;
