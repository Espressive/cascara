import React from 'react';
import pt from 'prop-types';
import StructureNavLink from '../components/StructureNavLink';

import styles from './AdminStructure.module.scss';

const propTypes = {
  links: pt.arrayOf(
    pt.shape({
      // eslint-disable-next-line react/forbid-prop-types -- SVG shows up as an object
      icon: pt.object,
      label: pt.string.isRequired,
      linkComponent: pt.shape({
        // Kind of a hack, but making sure that there is a render function
        // on the link component being passed so we know it is supposed to render
        render: pt.func,
      }),
      // eslint-disable-next-line react/forbid-prop-types -- Could be anything
      linkComponentProps: pt.object,
    })
  ),
};

const AdminStructureNav = ({ links }) => (
  <div className={styles.Nav}>
    {links?.map((link) => (
      <StructureNavLink
        activeClassName={styles.ActiveLink}
        className={styles.Link}
        key={link.label}
        {...link}
      />
    ))}
  </div>
);

AdminStructureNav.propTypes = propTypes;
AdminStructureNav.displayName = 'AdminStructure.Nav';

export default AdminStructureNav;
