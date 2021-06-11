import React from 'react';
import pt from 'prop-types';
import NavLink from './NavLink';
import NavSection from './NavSection';
import styles from './Nav.module.scss';

const propTypes = {
  links: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const Nav = ({ links }) => (
  <div className={styles.Nav}>
    {links?.map((link, i) => {
      const props = {
        key: link.label || i,
        ...link,
      };
      return link.links ? <NavSection {...props} /> : <NavLink {...props} />;
    })}
  </div>
);

Nav.propTypes = propTypes;
Nav.displayName = 'AdminStructure.Nav';

export default Nav;
