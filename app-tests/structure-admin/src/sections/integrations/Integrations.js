import React from 'react';
import { Outlet } from 'react-router-dom';
import integrations from './';
import TestLink from '../../components/TestLink';

const Integrations = () => {
  return (
    <>
      <h2>Integrations</h2>
      {integrations.routes.children.map((route) => (
        <TestLink key={route.path} to={route.path}>
          {route.label}
        </TestLink>
      ))}
      <Outlet />
    </>
  );
};

export default Integrations;
