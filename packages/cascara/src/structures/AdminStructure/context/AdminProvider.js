import React, { useState } from 'react';
import pt from 'prop-types';
import AdminContext from './AdminContext';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const AdminProvider = ({ children }) => {
  const [drawer, setDrawer] = useState();
  return (
    <AdminContext.Provider value={{ drawer, setDrawer }}>
      {children}
    </AdminContext.Provider>
  );
};

AdminProvider.propTypes = propTypes;

export default AdminProvider;
