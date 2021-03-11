import React from 'react';
import pt from 'prop-types';
import { Icon } from '@iconify/react';
import { NavLink as Link } from 'react-router-dom';
import styles from './Nav.module.scss';

const propTypes = {
  content: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const NavLink = ({ content, ...rest }) => {
  const { icon, ...props } = rest;
  return (
    <Link
      activeClassName={styles.ActiveLink}
      className={styles.Link}
      {...props}
    >
      <Icon
        className={styles.Icon}
        icon={icon}
        inline
        slice='slice'
        width={18}
      />
      {content}
    </Link>
  );
};

NavLink.propTypes = propTypes;

export default NavLink;
