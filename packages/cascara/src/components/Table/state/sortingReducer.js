const INITIAL_STATE = {
  attribute: null,
  order: 0,
};

const SORT = 'SORT';
const RESET = 'RESET';

const sortingReducer = (state = INITIAL_STATE, action = {}) => {
  const { payload = {}, type } = action;

  switch (type) {
    case RESET:
      return INITIAL_STATE;

    case SORT:
      return {
        ...INITIAL_STATE,
        ...payload,
      };

    default:
      return state;
  }
};

export { RESET, SORT };
export default sortingReducer;
