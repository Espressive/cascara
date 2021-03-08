import pt from 'prop-types';

import styles from './Nav.module.scss';

const propTypes = {
  content: pt.string,
};

const NavSection = ({ content }) => (
  <h4 className={styles.NavSection}>{content}</h4>
);

NavSection.propTypes = propTypes;

export default NavSection;
