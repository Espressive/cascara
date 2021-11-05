import React from 'react';
import pt from 'prop-types';
import { Role } from 'reakit/Role';
import styles from './BaristaStructure.module.scss';

const propTypes = {
  title: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const BaristaStructureHeader = ({ title }) => {
  return (
    <Role className={styles.Header}>
      <h1 className={styles.Title}>{title}</h1>
    </Role>
  );
};

BaristaStructureHeader.propTypes = propTypes;
BaristaStructureHeader.displayName = 'BaristaStructure.Header';

export default BaristaStructureHeader;
