import React from 'react';
import { BaristaStructure } from '@espressive/cascara';
import { NavLink } from 'react-router-dom';

import { basePath as messages } from '../../sections/messages';
import { basePath as directory } from '../../sections/directory';
import { basePath as shop } from '../../sections/shop';

const links = [messages, directory, shop];

const prepareLinkData = ({ path, ...rest }) => {
  return {
    ...rest,
    linkComponentProps: {
      to: path,
    },
  };
};

const preparedLinks = links.map(prepareLinkData);

const AppNav = () => (
  <BaristaStructure.Nav linkComponent={NavLink} links={preparedLinks} />
);

export default AppNav;
