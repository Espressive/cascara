import React from 'react';
import pt from 'prop-types';
import styles from './AdminStructure.module.scss';

const propTypes = {
  title: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const AdminStructureHeader = ({ title }) => {
  return (
    <div className={styles.Header}>
      <h1 className={styles.Title}>{title}</h1>
    </div>
  );
};

AdminStructureHeader.propTypes = propTypes;
AdminStructureHeader.displayName = 'AdminStructure.Header';

export default AdminStructureHeader;
