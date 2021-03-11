import React from 'react';
import pt from 'prop-types';
import styles from './Structure.module.scss';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const StructureList = ({ children }) => {
  return <section className={styles.List}>{children}</section>;
};

StructureList.propTypes = propTypes;
StructureList.displayName = 'Structure.List';

export default StructureList;
