import React from 'react';
import pt from 'prop-types';
import { NavLink } from './';

const propTypes = {
  links: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const NavLinks = ({ links }) =>
  links
    ? links.map((link, i) => <NavLink {...link} key={link.label || i} />)
    : null;

NavLinks.propTypes = propTypes;

export default NavLinks;
