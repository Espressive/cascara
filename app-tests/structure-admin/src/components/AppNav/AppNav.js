import React from 'react';
import { BaristaStructure } from '@espressive/cascara';
import { NavLink } from 'react-router-dom';
import { paths } from '../../routes';

const prepareLinkData = ({ path, ...rest }) => {
  return {
    ...rest,
    linkComponentProps: {
      to: path,
    },
  };
};

const preparedLinks = paths.map(prepareLinkData);

const AppNav = () => (
  <BaristaStructure.Nav linkComponent={NavLink} links={preparedLinks} />
);

export default AppNav;
