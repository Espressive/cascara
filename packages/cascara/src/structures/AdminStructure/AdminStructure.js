import { AdminProvider } from './context';
import React from 'react';
import pt from 'prop-types';
import { useStructureName, useThemeCustomProperties } from '../hooks';
import styles from './AdminStructure.module.scss';
import AdminStructureChildren from './AdminStructureChildren';
import Boundaries from '../../system-components/Boundaries';

const THEME_DEFAULTS = {
  color: {
    primary: '#a00',
    secondary: '#0aa',
  },
};

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  header: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  nav: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  theme: pt.shape({
    color: pt.shape({
      primary: pt.string,
      secondary: pt.string,
    }),
  }),
};

const AdminStructure = ({ children, header, nav, theme = THEME_DEFAULTS }) => {
  useStructureName('Admin');
  useThemeCustomProperties(theme);

  return (
    <AdminProvider>
      <header className={styles._header}>
        <Boundaries>{header}</Boundaries>
      </header>
      <nav className={styles._nav}>
        <Boundaries>{nav}</Boundaries>
      </nav>
      <AdminStructureChildren>
        <Boundaries>{children}</Boundaries>
      </AdminStructureChildren>
    </AdminProvider>
  );
};

AdminStructure.propTypes = propTypes;

export { propTypes };
export default AdminStructure;
