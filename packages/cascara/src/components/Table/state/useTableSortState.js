import { useCallback, useReducer } from 'react';

import sortingReducer, { INITIAL_STATE, SORT } from './sortingReducer';

const useTableSortState = (initialState) => {
  // infer a safe initial state
  const safeInitialState = initialState
    ? {
        ...INITIAL_STATE,
        ...initialState,
      }
    : INITIAL_STATE;
  const [state, dispatch] = useReducer(sortingReducer, safeInitialState);

  // expose a way to mutate the sort state
  const sortRecordsBy = useCallback((attribute) => {
    dispatch({ payload: attribute, type: SORT });
  }, []);

  return {
    sortRecordsBy,
    ...state,
  };
};

export default useTableSortState;
