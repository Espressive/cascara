import React from 'react';
import pt from 'prop-types';
import { Role } from 'reakit/Role';
import styles from './Admin.module.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

const propTypes = {
  children: pt.oneOfType([pt.node, pt.array]),
  className: pt.string,
};

const AdminDrawer = ({ children, className, ...rest }) => {
  return (
    <Role {...rest} className={cx(className, 'Drawer')}>
      {children}
    </Role>
  );
};

AdminDrawer.propTypes = propTypes;
AdminDrawer.displayName = 'Admin.Drawer';

export default AdminDrawer;
