import React from 'react';
import pt from 'prop-types';
import styles from './Admin.module.scss';

const propTypes = {
  children: pt.oneOfType([pt.node, pt.array]),
};

const AdminDrawer = ({ children, ...rest }) => {
  return (
    <div {...rest} className={styles.Drawer}>
      {children}
    </div>
  );
};

AdminDrawer.propTypes = propTypes;
AdminDrawer.displayName = 'Admin.Drawer';

export default AdminDrawer;
