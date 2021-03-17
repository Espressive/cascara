import { AdminStructure } from '@espressive/cascara';
import React from 'react';
import { Outlet } from 'react-router-dom';
import settings from './';
import TestLink from '../../components/TestLink';

const Settings = () => {
  return (
    <AdminStructure.Main links={[]}>
      {settings.routes.children.map((route) => (
        <TestLink key={route.path} to={route.path}>
          {route.label}
        </TestLink>
      ))}

      <Outlet />
    </AdminStructure.Main>
  );
};

export default Settings;
