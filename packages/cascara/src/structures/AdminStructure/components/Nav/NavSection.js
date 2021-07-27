import React from 'react';
import pt from 'prop-types';
import { useDisclosureState } from 'reakit';
import { LINK_SHAPE } from './__propTypes';
import NavMenu from './NavMenu';
import NavMenuButton from './NavMenuButton';

const propTypes = {
  label: pt.string,
  links: pt.arrayOf(pt.shape(LINK_SHAPE)),
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
