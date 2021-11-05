import React from 'react';
import pt from 'prop-types';
import { Role } from 'reakit/Role';
import styles from './Admin.module.scss';

const propTypes = {
  children: pt.oneOfType([pt.node, pt.array]),
};

const AdminDrawer = ({ children, ...rest }) => {
  return (
    <Role {...rest} className={styles.Drawer}>
      {children}
    </Role>
  );
};

AdminDrawer.propTypes = propTypes;
AdminDrawer.displayName = 'Admin.Drawer';

export default AdminDrawer;
