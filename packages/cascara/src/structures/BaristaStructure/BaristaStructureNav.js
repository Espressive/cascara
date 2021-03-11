import React from 'react';
import pt from 'prop-types';
import { Icon } from '@iconify/react';

import styles from './BaristaStructure.module.scss';

const propTypes = {
  linkComponent: pt.shape({
    // Kind of a hack, but making sure that there is a render function
    // on the link component being passed so we know it is supposed to render
    render: pt.func,
  }),
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

const BaristaStructureNav = ({ links, linkComponent, ...rest }) => {
  const NavLink = linkComponent;

  return (
    <div className={styles.Nav}>
      {links?.map((link) => {
        const { linkComponentProps, label, icon } = link;
        return (
          <NavLink className={styles.Link} key={label} {...linkComponentProps}>
            {icon && (
              <Icon className={styles.Icon} icon={icon} inline width={18} />
            )}
            {label}
          </NavLink>
        );
      })}
    </div>
  );
};

BaristaStructureNav.propTypes = propTypes;
BaristaStructureNav.displayName = 'BaristaStructure.Nav';

export default BaristaStructureNav;
