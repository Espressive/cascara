import React from 'react';
import pt from 'prop-types';
import styles from './Structure.module.scss';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const StructureHeader = ({ children }) => {
  return <header className={styles.Header}>{children}</header>;
};

StructureHeader.propTypes = propTypes;
StructureHeader.displayName = 'Structure.Header';

export default StructureHeader;
