import React, { cloneElement } from 'react';
import pt from 'prop-types';
import AdminDrawer from './AdminDrawer';
import AdminHeader from './AdminHeader';
import AdminMain from './AdminMain';
import AdminNav from './AdminNav';
import useSetLayoutAttribute from './hooks/useSetLayoutAttribute';

// TODO: Would be nice to be able to pass an element or array of React elements
// and if they do not have the proper grid container, just add it automatically.
const propTypes = {
  drawer: pt.oneOfType([pt.node, pt.array]),
  header: pt.node,
  main: pt.node,
  nav: pt.node,
};

const Admin = ({ drawer, header, main, nav }) => {
  // This hook sets a `data-layout` attribute on the html tag, which is needed
  // for CSS specificity in global styles
  useSetLayoutAttribute('admin');

  return (
    <>
      {header}
      {nav}
      {cloneElement(main, { isWithDrawer: Boolean(drawer) })}
      {drawer}
    </>
  );
};

Admin.propTypes = propTypes;

// Exporting all of these for easier use on the structure props
Admin.Drawer = AdminDrawer;
Admin.Header = AdminHeader;
Admin.Main = AdminMain;
Admin.Nav = AdminNav;

export default Admin;
