import React from 'react';
import pt from 'prop-types';
import styles from './Structure.module.scss';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const StructureNav = ({ children }) => {
  return <nav className={styles.Nav}>{children}</nav>;
};

StructureNav.propTypes = propTypes;
StructureNav.displayName = 'Structure.Nav';

export default StructureNav;
