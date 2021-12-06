import React from 'react';
import pt from 'prop-types';
import styles from './Admin.module.scss';
import { Role } from 'reakit/Role';
import classnames from 'classnames/bind';

const propTypes = {
  as: pt.string,
  children: pt.oneOfType([pt.node, pt.array]),
};

const cx = classnames.bind(styles);

const AdminDrawer = ({ as = 'div', children, ...rest }) => {
  return (
    <Role {...rest} as={as} className={cx('Drawer', rest.className)}>
      {children}
    </Role>
  );
};

AdminDrawer.propTypes = propTypes;
AdminDrawer.displayName = 'Admin.Drawer';

export default AdminDrawer;
