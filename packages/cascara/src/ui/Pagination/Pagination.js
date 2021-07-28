import React, { useCallback } from 'react';
import pt from 'prop-types';
import { LABELS, PAGINATION_OPTIONS, WARNING_STRINGS } from './__globals';
import useDeveloperMessage from '../../hooks/useDeveloperMessage';
import styles from './Pagination.module.scss';

import getStatusFromDataLength from '../../lib/getStatusFromDataLength';

const propTypes = {
  // The state of the Pagination component from the usePaginationState hook
  state: pt.exact({
    currentPage: pt.number,
    perPage: pt.number,
    setCurrentPage: pt.func,
    setPerPage: pt.func,
  }),
  // The total number of records. undefined (default) sets the component to loading state. 0 sets the component to an empty state.
  totalRecordCount: pt.number,
};

const Pagination = ({ totalRecordCount, state }) => {
  // Destructure our state hook values
  const { currentPage = 1, perPage, setCurrentPage, setPerPage } = state || {};

  // determine if it is loading or empty.
  const { isLoading, isEmpty } = getStatusFromDataLength(totalRecordCount);

  // Instead of defining a default prop for perPage to make sure it always has a value,
  // we set whatever the first item in paginationOptions is. This prop has a default
  // so it will always have a value.
  const recordsPerPage = perPage || PAGINATION_OPTIONS[0];

  // We are checking to see if state hooks are missing for two reasons:
  // 1. We can disable any interactive items that require state hooks
  // 2. We can alert a developer that these hooks are needed.
  const isMissingStateHooks = !state;

  useDeveloperMessage(isMissingStateHooks, WARNING_STRINGS.MISSING_STATE_HOOK);

  // So the rest of pagination display does not blow up, we set the page length
  // to 1 so we never have an empty dropdown. Controls will always be disabled
  // on loading or empty.
  const totalPages =
    isLoading || isEmpty ? 1 : Math.ceil(totalRecordCount / recordsPerPage);

  const handlePaginationChange = useCallback(
    (e) => {
      setPerPage(Number(e.target.value));
      // We also need to set the current page to 1 if the number of
      // items per page changes or we could end up out of bounds
      setCurrentPage(1);
    },
    [setPerPage, setCurrentPage]
  );

  const handlePageChange = useCallback(
    (e) => setCurrentPage(Number(e.target.value)),
    [setCurrentPage]
  );

  const handlePageNext = useCallback(
    () => setCurrentPage(currentPage + 1),
    [currentPage, setCurrentPage]
  );

  const handlePagePrev = useCallback(
    () => setCurrentPage(currentPage - 1),
    [currentPage, setCurrentPage]
  );

  const buttonClassNames = isLoading ? 'ui loading button' : 'ui button';

  return (
    <div className={styles._}>
      <div className='ui form'>
        <div className='inline fields'>
          {!isLoading && (
            <div className='field'>
              <p
                aria-label={LABELS.RECORD_COUNT}
                className={styles.records}
              >{`${totalRecordCount} record${
                totalRecordCount === 1 ? '' : 's'
              }`}</p>
            </div>
          )}
          <div className='field'>
            <select
              className='ui dropdown'
              disabled={isLoading || isEmpty || isMissingStateHooks}
              id='pagination-per-page'
              name='pagination-per-page'
              onBlur={handlePaginationChange}
              onChange={handlePaginationChange}
              value={recordsPerPage}
            >
              {PAGINATION_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <label htmlFor='pagination-per-page'>per page</label>
            {!isLoading && !isEmpty && (
              <p
                aria-label={LABELS.CURRENT_RECORDS}
                className={styles.count}
              >{`(${(currentPage - 1) * recordsPerPage + 1}-${
                currentPage * recordsPerPage
              })`}</p>
            )}
          </div>
        </div>
      </div>

      <div className='ui form'>
        <div className='inline fields'>
          <div className='field'>
            <label htmlFor='pagination-totalRecordCount'>Page</label>
            <select
              className='ui dropdown'
              disabled={isLoading || isEmpty || isMissingStateHooks}
              id='pagination-totalRecordCount'
              name='pagination-totalRecordCount'
              onBlur={handlePageChange}
              onChange={handlePageChange}
              value={currentPage}
            >
              {[...Array(totalPages).keys()].map((i) => (
                // Basically we just create an array of index keys with the length of our pages
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            {!isLoading && <p className={styles.count}>{`of ${totalPages}`}</p>}
          </div>
          <div className='field'>
            <div className='ui small basic icon buttons'>
              <button
                className={buttonClassNames}
                disabled={
                  isLoading ||
                  isEmpty ||
                  isMissingStateHooks ||
                  currentPage === 1
                }
                onClick={handlePagePrev}
                type='button'
              >
                <i className='left chevron icon' />
              </button>
              <button
                className={buttonClassNames}
                disabled={
                  isLoading ||
                  isEmpty ||
                  isMissingStateHooks ||
                  currentPage === totalPages
                }
                onClick={handlePageNext}
                type='button'
              >
                <i className='right chevron icon' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Pagination.propTypes = propTypes;

export { propTypes };

export default Pagination;
