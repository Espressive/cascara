import _extends from '@babel/runtime/helpers/esm/extends';
import pt from 'prop-types';

const customPropTypes = {
  /** Can render as a different type of component */
  as: pt.oneOfType([pt.string, pt.elementType]),
  // Default for typing children in React
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const propTypes = _extends({}, pt, customPropTypes); // This extend all the propTypes from react prop-types plus the new ones that Espressive suports

export default propTypes;
//# sourceMappingURL=index.js.map
