import React from 'react';
import pt from 'prop-types';
import styles from './Admin.module.scss';

const propTypes = {
  children: pt.node,
};

const AdminNav = ({ children, ...rest }) => {
  return (
    <nav {...rest} className={styles.Nav}>
      {children}
    </nav>
  );
};

AdminNav.propTypes = propTypes;
AdminNav.displayName = 'Admin.Nav';

export default AdminNav;
