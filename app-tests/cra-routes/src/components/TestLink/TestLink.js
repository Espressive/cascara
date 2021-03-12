import React from 'react';
import pt from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './TestLink.module.scss';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const TestLink = ({ children, ...rest }) => {
  return (
    <NavLink {...rest} activeClassName={styles.active} className={styles._}>
      {children}
    </NavLink>
  );
};

TestLink.propTypes = propTypes;

export default TestLink;
