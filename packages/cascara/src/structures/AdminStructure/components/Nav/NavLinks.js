import React from 'react';
import pt from 'prop-types';
import { linkShape } from './Nav';
import NavLink from './NavLink';

const propTypes = {
  links: pt.arrayOf(pt.shape(linkShape)),
};

const NavLinks = ({ links }) =>
  links
    ? links.map((link, i) => <NavLink {...link} key={link.label || i} />)
    : null;

NavLinks.propTypes = propTypes;

export default NavLinks;
