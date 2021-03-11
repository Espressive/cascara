import React from 'react';
import pt from 'prop-types';
import styles from './Layout.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  isLoading: pt.bool,
};

const LayoutHeader = ({ children, isLoading = false, ...rest }) => {
  const { className, ...props } = rest;
  return (
    <div
      {...props}
      className={cx(className, {
        Header: true,
        loading: isLoading,
      })}
    >
      {children}
    </div>
  );
};

LayoutHeader.propTypes = propTypes;

export default LayoutHeader;
