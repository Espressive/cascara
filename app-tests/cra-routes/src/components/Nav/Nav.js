import React from 'react';
import { Nav as CascaraNav } from '../../layout';
import NavLink from './NavLink';

import { basePath as messagesPaths } from '../../sections/messages';
import { basePath as directoryPaths } from '../../sections/directory';

const links = [messagesPaths, directoryPaths];

const Nav = () => {
  return (
    <CascaraNav>
      {links.map((link) => (
        <NavLink
          content={link.label}
          icon={link.icon}
          key={link.path}
          to={link.path}
        />
      ))}
    </CascaraNav>
  );
};

export default Nav;
