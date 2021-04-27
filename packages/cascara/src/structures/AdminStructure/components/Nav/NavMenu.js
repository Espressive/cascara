import React from 'react';
import pt from 'prop-types';
import { DisclosureContent } from 'reakit';
import { NavLinks, styles } from './';

const propTypes = {
  label: pt.string,
  links: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const NavMenu = ({ label = 'Menu', links, ...rest }) => (
  <DisclosureContent {...rest} aria-label={label} className={styles.NavMenu}>
    <NavLinks links={links} />
  </DisclosureContent>
);

NavMenu.propTypes = propTypes;

export default NavMenu;
