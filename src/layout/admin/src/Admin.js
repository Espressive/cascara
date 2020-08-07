import React from 'react';
import pt from 'prop-types';
import styles from './Admin.module.scss';
import AdminHeader from './AdminHeader';
import AdminMain from './AdminMain';
import AdminNav from './AdminNav';
import useSetLayoutAttribute from '../../../shared/useSetLayoutAttribute';

const propTypes = {
  children: pt.node,
  header: pt.node,
  main: pt.node,
  nav: pt.node,
};

const renderLayout = ({ header, nav, main }) => {
  return (
    <>
      {header && <AdminHeader>{header}</AdminHeader>}
      {nav && <AdminNav>{nav}</AdminNav>}
      {main && <AdminMain>{main}</AdminMain>}
    </>
  );
};

const Admin = ({ children, ...rest }) => {
  // This hook sets a `data-layout` attribute on the html tag, which is needed for CSS specificity in global styles
  useSetLayoutAttribute('admin');

  return (
    <div {...rest} className={styles._}>
      {children ? children : renderLayout({ ...rest })}
    </div>
  );
};

Admin.propTypes = propTypes;

Admin.Header = AdminHeader;
Admin.Main = AdminMain;
Admin.Nav = AdminNav;

export default Admin;
