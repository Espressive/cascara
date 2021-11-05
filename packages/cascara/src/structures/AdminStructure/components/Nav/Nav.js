import React from 'react';
import { Role } from 'reakit/Role';
import pt from 'prop-types';
import NavLink from './NavLink';
import NavSection from './NavSection';
import styles from './Nav.module.scss';
import classNames from 'classnames/bind';
import { LINK_SHAPE } from './__propTypes';

const cx = classNames.bind(styles);

const sectionShape = {
  label: pt.string.isRequired,
  links: pt.arrayOf(pt.shape(LINK_SHAPE)),
};

const propTypes = {
  links: pt.arrayOf(
    pt.oneOfType([pt.shape(LINK_SHAPE), pt.shape(sectionShape)])
  ),
};

const Nav = ({ links, ...rest }) => (
  <Role {...rest} className={cx('Nav', rest.className)}>
    {links?.map((link, i) => {
      const props = {
        key: link.label || i,
        ...link,
      };
      return link.links ? <NavSection {...props} /> : <NavLink {...props} />;
    })}
  </Role>
);

Nav.propTypes = propTypes;
Nav.displayName = 'AdminStructure.Nav';

export default Nav;
