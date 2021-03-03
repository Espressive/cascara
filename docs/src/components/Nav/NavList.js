import pt from 'prop-types';

import styles from './Nav.module.scss';

const propTypes = {
  children: pt.oneOfType([pt.element(), pt.arrayOf(pt.element)]),
};

const NavList = ({ children }) => {
  return <ul className={styles.NavList}>{children}</ul>;
};

NavList.propTypes = propTypes;

export default NavList;
