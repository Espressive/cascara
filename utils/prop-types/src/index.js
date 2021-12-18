import pt from 'prop-types';

// TO-DO: actions, icon object.
const customPropTypes = {
  /** Can render as a different type of component */
  as: pt.oneOfType([pt.string, pt.elementType]),
  // Default for typing children in React
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

// This extend all the propTypes from react prop-types plus the new ones that Espressive suports
const propTypes = { ...pt, ...customPropTypes };

export default propTypes;
