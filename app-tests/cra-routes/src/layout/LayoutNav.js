import React from 'react';
import pt from 'prop-types';
import styles from './Layout.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  isLoading: pt.bool,
};

const LayoutNav = ({ children, isLoading = false, ...rest }) => {
  const { className, ...props } = rest;
  return (
    <div
      {...props}
      className={cx(className, {
        Nav: true,
        loading: isLoading,
      })}
    >
      {children}
    </div>
  );
};

LayoutNav.propTypes = propTypes;

export default LayoutNav;
