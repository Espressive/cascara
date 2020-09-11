import styles from './Nav.module.scss';

const NavList = ({ children }) => {
  return <ul className={styles.NavList}>{children}</ul>;
};
export default NavList;
