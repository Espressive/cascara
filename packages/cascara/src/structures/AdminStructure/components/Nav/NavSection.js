import React from 'react';
import pt from 'prop-types';
import { useDisclosureState } from 'reakit';
import NavMenu from './NavMenu';
import NavMenuButton from './NavMenuButton';

const propTypes = {
  label: pt.string,
  links: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const NavSection = ({ label, links }) => {
  const disclosure = useDisclosureState();

  return (
    <>
      <NavMenuButton {...disclosure} label={label} />
      <NavMenu {...disclosure} label={label} links={links} />
    </>
  );
};

NavSection.propTypes = propTypes;

export default NavSection;
