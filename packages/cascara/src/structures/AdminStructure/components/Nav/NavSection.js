import React from 'react';
import pt from 'prop-types';
import { useDisclosureState } from 'reakit';
import { LINK_SHAPE } from './__propTypes';
import NavMenu from './NavMenu';
import NavMenuButton from './NavMenuButton';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types -- SVG shows up as an object
  icon: pt.object,
  label: pt.string,
  links: pt.arrayOf(pt.shape(LINK_SHAPE)),
};

const NavSection = ({ label, links, icon }) => {
  const disclosure = useDisclosureState();
  return (
    <>
      <NavMenuButton {...disclosure} icon={icon} label={label} />
      <NavMenu {...disclosure} label={label} links={links} />
    </>
  );
};

NavSection.propTypes = propTypes;

export default NavSection;
