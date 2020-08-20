import styles from './Nav.module.css';

const NavSection = ({ content }) => (
  <h4 className={styles.NavSection}>{content}</h4>
);

export default NavSection;
