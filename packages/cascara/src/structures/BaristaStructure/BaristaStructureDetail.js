import React from 'react';
import pt from 'prop-types';
import { Role } from 'reakit/Role';
import styles from './BaristaStructure.module.scss';
import classNames from 'classnames/bind';

import Loader from '../../private/Loader';
const cx = classNames.bind(styles);

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  header: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  isLoading: pt.bool,
};

const BaristaStructureDetail = ({
  children,
  header,
  isLoading = false,
  ...rest
}) => {
  const { className, ...props } = rest;
  return (
    <Role
      {...props}
      className={cx(className, {
        Detail: true,
        loading: isLoading,
      })}
    >
      {header && <h2 className={styles.Heading}>{header}</h2>}
      {children}

      {isLoading && !children && <Loader />}
    </Role>
  );
};

BaristaStructureDetail.propTypes = propTypes;
BaristaStructureDetail.displayName = 'BaristaStructure.Detail';

export default BaristaStructureDetail;
