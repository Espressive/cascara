import React from 'react';
import pt from 'prop-types';
import styles from './Layout.module.scss';
import classNames from 'classnames/bind';

import Loader from './LayoutLoader';
const cx = classNames.bind(styles);

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  heading: pt.string,
  isLoading: pt.bool,
};

const LayoutDetail = ({ children, heading, isLoading = false, ...rest }) => {
  const { className, ...props } = rest;
  return (
    <div
      {...props}
      className={cx(className, {
        Detail: true,
        loading: isLoading,
      })}
    >
      {heading && <h2 className={styles.Heading}>{heading}</h2>}
      {children}

      {isLoading && !children && <Loader />}
    </div>
  );
};

LayoutDetail.propTypes = propTypes;

export default LayoutDetail;
