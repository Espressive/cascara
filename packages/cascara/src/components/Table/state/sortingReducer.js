const SORT = 'SORT';
const SORT_ORDER = {
  UNSORTED: 'UNSORTED',
  ASCENDING: 'ASCENDING',
  DESCENDING: 'DESCENDING',
};

const INITIAL_STATE = {
  attribute: null,
  order: SORT_ORDER.ASCENDING,
};

const sortingReducer = (state, action = {}) => {
  const { payload: attribute, type } = action;
  let newOrder = state.order;

  if (attribute === state.attribute) {
    if (state.order === SORT_ORDER.UNSORTED) {
      newOrder = SORT_ORDER.ASCENDING;
    }

    if (state.order === SORT_ORDER.ASCENDING) {
      newOrder = SORT_ORDER.DESCENDING;
    }

    if (state.order === SORT_ORDER.DESCENDING) {
      newOrder = SORT_ORDER.UNSORTED;
    }
  }

  switch (type) {
    case SORT:
      return {
        attribute,
        order: newOrder,
      };

    default:
      return state;
  }
};

export { INITIAL_STATE, SORT, SORT_ORDER };
export default sortingReducer;
