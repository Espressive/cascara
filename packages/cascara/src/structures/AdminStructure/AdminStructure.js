import { AdminProvider } from './context';
import React from 'react';
import pt from 'prop-types';
import { useStructureName } from '../hooks';
import styles from './AdminStructure.module.scss';
import AdminStructureChildren from './AdminStructureChildren';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  header: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  nav: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const AdminStructure = ({ children, header, nav }) => {
  useStructureName('Admin');

  return (
    <AdminProvider>
      <header className={styles._header}>{header}</header>
      <nav className={styles._nav}>{nav}</nav>
      <AdminStructureChildren>{children}</AdminStructureChildren>
    </AdminProvider>
  );
};

AdminStructure.propTypes = propTypes;

export default AdminStructure;
