import pt from 'prop-types';

export const PROP_TYPES = {
  /** The section content */
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  /** Columns can have css class name */
  className: pt.string,
  /** The number of columns to allocate */
  count: pt.number,
};
