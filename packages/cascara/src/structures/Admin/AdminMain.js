import React from 'react';
import pt from 'prop-types';
import styles from './Admin.module.scss';

const propTypes = {
  children: pt.node,
};

const AdminMain = ({ children = 'Main', ...rest }) => {
  return (
    <main {...rest} className={styles.Main}>
      {children}
    </main>
  );
};

AdminMain.propTypes = propTypes;
AdminMain.displayName = 'Admin.Main';

export default AdminMain;
