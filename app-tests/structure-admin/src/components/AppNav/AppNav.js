import React from 'react';
import { AdminStructure } from '@espressive/cascara';
import { NavLink } from 'react-router-dom';
import { paths } from '../../routes';

const prepareLinkData = ({ icon, path, label }) => ({
  icon: icon,
  label: label,
  linkComponent: NavLink,
  linkComponentProps: {
    end: path === '',
    to: path,
  },
});

const AppNav = () => {
  const preparedLinks = paths.map(prepareLinkData);

  return <AdminStructure.Nav linkComponent={NavLink} links={preparedLinks} />;
};

export default AppNav;
