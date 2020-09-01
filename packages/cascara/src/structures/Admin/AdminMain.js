import classNames from 'classnames/bind';
import React from 'react';
import pt from 'prop-types';
import styles from './Admin.module.scss';

const cx = classNames.bind(styles);

const propTypes = {
  children: pt.node,
  isWithDrawer: pt.bool,
};

const AdminMain = ({ children, isWithDrawer = false, ...rest }) => {
  const internalClassName = cx(rest.className, {
    Main: true,
    'no-drawer': !isWithDrawer,
  });

  return (
    <main {...rest} className={internalClassName}>
      {children}
    </main>
  );
};

AdminMain.propTypes = propTypes;
AdminMain.displayName = 'Admin.Main';

export default AdminMain;
