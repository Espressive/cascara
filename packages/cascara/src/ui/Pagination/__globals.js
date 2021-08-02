const PAGINATION_OPTIONS = [25, 50, 100, 150];

// const noop = () => {};

const INITIAL_STATE = {
  currentPage: 1,
  perPage: PAGINATION_OPTIONS[0],
  // setCurrentPage: noop,
  // setPerPage: noop,
};

const REDUCER_ACTIONS = {
  SET_COUNT: 'SET_COUNT',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  SET_PER_PAGE: 'SET_PER_PAGE',
};

const WARNING_STRINGS = {
  MISSING_STATE_HOOK:
    'Pagination requires a usePaginationState hook in order to work.',
};

const LABELS = {
  CURRENT_RECORDS: 'Current Records',
  RECORD_COUNT: 'Record Count',
};

export {
  INITIAL_STATE,
  LABELS,
  PAGINATION_OPTIONS,
  REDUCER_ACTIONS,
  WARNING_STRINGS,
};
