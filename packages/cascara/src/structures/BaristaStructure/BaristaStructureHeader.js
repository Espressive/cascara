import React from 'react';
import pt from 'prop-types';
import styles from './BaristaStructure.module.scss';
import { Role } from 'reakit/Role';
import classnames from 'classnames/bind';

const propTypes = {
  as: pt.string,
  className: pt.string,
  title: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const cx = classnames.bind(styles);

const BaristaStructureHeader = ({ as = 'div', className, title, ...rest }) => {
  return (
    <Role {...rest} as={as} className={cx(className, 'Header')}>
      <h1 className={styles.Title}>{title}</h1>
    </Role>
  );
};

BaristaStructureHeader.propTypes = propTypes;
BaristaStructureHeader.displayName = 'BaristaStructure.Header';

export default BaristaStructureHeader;
