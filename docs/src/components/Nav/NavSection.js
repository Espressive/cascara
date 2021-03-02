import styles from './Nav.module.scss';

const NavSection = ({ content }) => (
  <h4 className={styles.NavSection}>{content}</h4>
);
export default NavSection;
