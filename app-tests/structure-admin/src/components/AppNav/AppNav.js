import React from 'react';
import { AdminStructure } from '@espressive/cascara';
import { NavLink } from 'react-router-dom';
import { paths } from '../../routes';
import resolvePath from 'resolve-path';

const prepareLinkData = ({ icon, path, label }) => ({
  icon: icon,
  label: label,
  linkComponent: NavLink,
  linkComponentProps: {
    end: path === '',
    to: resolvePath(process.env.PUBLIC_URL, path),
    // to: `${process.env.PUBLIC_URL}/${path}`,
  },
});

const AppNav = () => {
  const preparedLinks = paths.map(prepareLinkData);

  return <AdminStructure.Nav linkComponent={NavLink} links={preparedLinks} />;
};

export default AppNav;
