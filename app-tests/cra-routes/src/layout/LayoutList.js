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

const LayoutList = ({ children, heading, isLoading = false, ...rest }) => {
  const { className, ...props } = rest;
  return (
    <div
      {...props}
      className={cx(className, {
        List: true,
        loading: isLoading,
      })}
    >
      {heading && <h3 className={styles.Heading}>{heading}</h3>}
      {children}

      {isLoading && !children && <Loader />}
    </div>
  );
};

LayoutList.propTypes = propTypes;

export default LayoutList;
