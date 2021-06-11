import React from 'react';
import pt from 'prop-types';
import { Disclosure } from 'reakit';
import styles from './Nav.module.scss';

const propTypes = {
  label: pt.string,
};

const NavMenuButton = ({ label = 'Menu', ...rest }) => {
  return (
    <Disclosure className={styles.NavMenuButton} {...rest}>
      {label}
    </Disclosure>
  );
};

NavMenuButton.propTypes = propTypes;

export default NavMenuButton;
