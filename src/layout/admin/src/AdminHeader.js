import React from 'react';
import pt from 'prop-types';
import styles from './Admin.module.scss';

const propTypes = {
  children: pt.node,
};

const AdminHeader = ({ children = 'Header', ...rest }) => {
  return (
    <header {...rest} className={styles.Header}>
      {children}
    </header>
  );
};

AdminHeader.propTypes = propTypes;
AdminHeader.displayName = 'Admin.Header';

export default AdminHeader;
