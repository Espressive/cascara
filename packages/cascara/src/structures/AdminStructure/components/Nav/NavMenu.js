import React from 'react';
import pt from 'prop-types';
import { DisclosureContent } from 'reakit';
import { linkShape } from './Nav';
import NavLinks from './NavLinks';
import styles from './Nav.module.scss';

const propTypes = {
  label: pt.string,
  links: pt.arrayOf(pt.shape(linkShape)),
};

const NavMenu = ({ label = 'Menu', links, ...rest }) => (
  <DisclosureContent {...rest} aria-label={label} className={styles.NavMenu}>
    <NavLinks links={links} />
  </DisclosureContent>
);

NavMenu.propTypes = propTypes;

export default NavMenu;
