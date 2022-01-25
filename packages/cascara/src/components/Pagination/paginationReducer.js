import { REDUCER_ACTIONS } from './__globals';

function paginationReducer(state, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case REDUCER_ACTIONS.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };

    case REDUCER_ACTIONS.SET_PER_PAGE:
      return {
        ...state,
        perPage: payload,
      };

    default:
      return state;
  }
}

export default paginationReducer;
