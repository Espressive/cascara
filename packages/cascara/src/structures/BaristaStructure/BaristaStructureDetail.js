import React from 'react';
import pt from 'prop-types';
import styles from './BaristaStructure.module.scss';
import classNames from 'classnames/bind';

import Loader from '../../ui/Loader';
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
    <div
      {...props}
      className={cx(className, {
        Detail: true,
        loading: isLoading,
      })}
    >
      {header && <h2 className={styles.Heading}>{header}</h2>}
      {children}

      {isLoading && !children && <Loader />}
    </div>
  );
};

BaristaStructureDetail.propTypes = propTypes;
BaristaStructureDetail.displayName = 'BaristaStructure.Detail';

export default BaristaStructureDetail;
