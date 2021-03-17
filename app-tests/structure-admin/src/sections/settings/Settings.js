import { AdminStructure } from '@espressive/cascara';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import settings from './';

const prepareLinkData = ({ path, label }) => {
  return {
    label: label,
    linkComponent: NavLink,
    linkComponentProps: {
      end: path === '',
      to: path,
    },
  };
};

const Settings = () => {
  const preparedLinks = settings?.routes?.children.map(prepareLinkData);

  return (
    <AdminStructure.Main
      body={<Outlet />}
      header='Settings'
      links={preparedLinks}
    />
  );
};

export default Settings;
