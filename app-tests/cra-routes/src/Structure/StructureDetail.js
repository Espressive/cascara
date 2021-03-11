import React from 'react';
import pt from 'prop-types';
import styles from './Structure.module.scss';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const StructureDetail = ({ children }) => {
  return <section className={styles.Detail}>{children}</section>;
};

StructureDetail.propTypes = propTypes;
StructureDetail.displayName = 'Structure.Detail';

export default StructureDetail;
