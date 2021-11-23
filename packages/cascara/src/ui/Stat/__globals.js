import pt from 'prop-types';

export const PROP_TYPES = {
  /** Stats can have their own css class name */
  className: pt.string,
  /** Stats can be fuild */
  fluid: pt.bool,
  /** Stats can have a label */
  label: pt.string,
  /** Stats can be clickable */
  onClick: pt.func,
  /** Stats can have a sub text */
  sub: pt.oneOfType([pt.number, pt.string]),
  /** Stats can have a value */
  value: pt.oneOfType([pt.number, pt.string]),
};
