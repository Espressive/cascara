import pt from 'prop-types';

import styles from './Nav.module.scss';

const propTypes = {
  children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)]),
};

const NavList = ({ children }) => {
  return <ul className={styles.NavList}>{children}</ul>;
};

NavList.propTypes = propTypes;

export default NavList;
