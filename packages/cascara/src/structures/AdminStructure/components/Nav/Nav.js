import React from 'react';
import pt from 'prop-types';
import NavLink from './NavLink';
import NavSection from './NavSection';
import styles from './Nav.module.scss';

const linkShape = {
  icon: pt.object,
  label: pt.string.isRequired,
  linkComponentProps: pt.object,
};

const sectionShape = {
  label: pt.string.isRequired,
  links: pt.arrayOf(pt.shape(linkShape)),
};

const propTypes = {
  links: pt.arrayOf(
    pt.oneOfType([pt.shape(linkShape), pt.shape(sectionShape)])
  ),
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

export { linkShape };

export default Nav;
