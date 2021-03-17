import React from 'react';
import pt from 'prop-types';
import StructureNavLink from '../components/StructureNavLink';

import styles from './BaristaStructure.module.scss';

const propTypes = {
  links: pt.arrayOf(
    pt.shape({
      // eslint-disable-next-line react/forbid-prop-types -- SVG shows up as an object
      icon: pt.object,
      label: pt.string.isRequired,
      // eslint-disable-next-line react/forbid-prop-types -- Could be anything
      linkComponentProps: pt.object,
    })
  ),
};

const BaristaStructureNav = ({ links }) => (
  <div className={styles.Nav}>
    {links?.map((link) => (
      <StructureNavLink className={styles.Link} key={link.label} {...link} />
    ))}
  </div>
);

BaristaStructureNav.propTypes = propTypes;
BaristaStructureNav.displayName = 'BaristaStructure.Nav';

export default BaristaStructureNav;
