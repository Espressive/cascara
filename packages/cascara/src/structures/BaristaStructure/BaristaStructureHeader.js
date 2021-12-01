import React from 'react';
import pt from 'prop-types';
import styles from './BaristaStructure.module.scss';

const propTypes = {
  title: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const BaristaStructureHeader = ({ title }) => {
  return (
    <div className={styles.Header}>
      <h1 className={styles.Title}>{title}</h1>
    </div>
  );
};

BaristaStructureHeader.propTypes = propTypes;
BaristaStructureHeader.displayName = 'BaristaStructure.Header';

export default BaristaStructureHeader;
