import React, { useContext } from 'react';
import pt from 'prop-types';
import { Menu } from 'reakit';
import StructureNavLink from '../components/StructureNavLink';
import { AdminContext } from './context';

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

const AdminStructureNav = ({ links }) => {
  const { isSizeSmall, menuNav } = useContext(AdminContext);

  return (
    <Menu
      {...menuNav}
      aria-label='Navigation'
      className={styles.Nav}
      focusable={false}
      hideOnClickOutside={isSizeSmall}
    >
      {links?.map((link) => {
        return (
          <StructureNavLink
            {...link}
            {...menuNav}
            activeClassName={styles.ActiveLink}
            className={styles.Link}
            key={link.label}
            onClick={menuNav.hide}
          />
        );
      })}
    </Menu>
  );
};

AdminStructureNav.propTypes = propTypes;
AdminStructureNav.displayName = 'AdminStructure.Nav';

export default AdminStructureNav;
