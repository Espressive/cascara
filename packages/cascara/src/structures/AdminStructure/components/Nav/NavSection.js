import React from 'react';
import pt from 'prop-types';
import { useDisclosureState } from 'reakit';
import { linkShape } from './Nav';
import NavMenu from './NavMenu';
import NavMenuButton from './NavMenuButton';

const propTypes = {
  label: pt.string,
  links: pt.arrayOf(pt.shape(linkShape)),
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
