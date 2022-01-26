import { useCallback, useReducer } from 'react';

import { INITIAL_STATE, REDUCER_ACTIONS } from './__globals';

import paginationReducer from './paginationReducer';

const usePaginationState = (initialState) => {
  const safeInitialState = initialState
    ? {
        ...INITIAL_STATE,
        ...initialState,
      }
    : INITIAL_STATE;
  const [state, dispatch] = useReducer(paginationReducer, safeInitialState);

  const setCurrentPage = useCallback(
    (currentPage) =>
      dispatch({
        payload: currentPage,
        type: REDUCER_ACTIONS.SET_CURRENT_PAGE,
      }),
    []
  );

  const setPerPage = useCallback(
    (perPage) =>
      dispatch({ payload: perPage, type: REDUCER_ACTIONS.SET_PER_PAGE }),
    []
  );

  return {
    setCurrentPage,
    setPerPage,
    ...state,
  };
};

export default usePaginationState;
