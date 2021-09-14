import { append, without } from 'ramda';

const INITIAL_STATE = [];
const SELECT = 'SELECT';
const UNSELECT = 'UNSELECT';
const CLEAR = 'CLEAR';

const listReducer = (state = INITIAL_STATE, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    case 'SELECT':
      if (Array.isArray(payload)) {
        return [...payload, ...state];
      } else {
        return append(payload, state);
      }

    case 'UNSELECT':
      return without(payload, state);

    case 'CLEAR':
      return [];

    default:
      return state;
  }
};

export { SELECT, UNSELECT, CLEAR };
export default listReducer;
