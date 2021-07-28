import React from 'react';
import pt from 'prop-types';
import { LINK_SHAPE } from './__propTypes';
import NavLink from './NavLink';

const propTypes = {
  links: pt.arrayOf(pt.shape(LINK_SHAPE)),
};

const NavLinks = ({ links }) =>
  links
    ? links.map((link, i) => <NavLink {...link} key={link.label || i} />)
    : null;

NavLinks.propTypes = propTypes;

export default NavLinks;
