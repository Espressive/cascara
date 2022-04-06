const SORT = 'SORT';
const SORT_ORDER = {
  ASCENDING: 'ASCENDING',
  DESCENDING: 'DESCENDING',
  UNSORTED: 'UNSORTED',
};

const INITIAL_STATE = {
  sortAttribute: null,
  sortOrder: SORT_ORDER.ASCENDING,
};

const sortingReducer = (state, action = {}) => {
  const { payload: attribute, type } = action;
  let newOrder = state.sortOrder;

  if (attribute === state.sortAttribute) {
    if (state.sortOrder === SORT_ORDER.UNSORTED) {
      newOrder = SORT_ORDER.ASCENDING;
    }

    if (state.sortOrder === SORT_ORDER.ASCENDING) {
      newOrder = SORT_ORDER.DESCENDING;
    }

    if (state.sortOrder === SORT_ORDER.DESCENDING) {
      newOrder = SORT_ORDER.UNSORTED;
    }
  }

  switch (type) {
    case SORT:
      return {
        sortAttribute: attribute,
        sortOrder: newOrder,
      };

    default:
      return state;
  }
};

export { INITIAL_STATE, SORT, SORT_ORDER };
export default sortingReducer;
