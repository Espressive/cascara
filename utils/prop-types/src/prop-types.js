import pt from 'prop-types';
const customPropTypes = {
  /** Can render as a different type of component */
  as: pt.oneOfType([pt.string, pt.elementType]),
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  header: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  icon: pt.shape({}),
  list: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  main: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  nav: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  post: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  title: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};
const propTypes = { ...pt, ...customPropTypes };
export default propTypes;
