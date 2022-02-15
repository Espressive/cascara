import { append, without } from 'ramda';

const INITIAL_STATE = [];
const SELECT = 'SELECT';
const UNSELECT = 'UNSELECT';

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

    default:
      return state;
  }
};

export { SELECT, UNSELECT };
export default listReducer;
