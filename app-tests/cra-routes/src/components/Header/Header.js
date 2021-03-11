import React from 'react';
import pt from 'prop-types';
import styles from './Header.module.scss';
import { Header as CascaraHeader } from '../../layout';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const Header = ({ children }) => {
  return (
    <CascaraHeader className={styles._}>
      <h1 className={styles.Title}>Cool Company</h1>
    </CascaraHeader>
  );
};

Header.propTypes = propTypes;

export default Header;
