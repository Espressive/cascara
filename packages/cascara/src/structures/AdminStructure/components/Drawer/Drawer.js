import React from 'react';
import pt from 'prop-types';
import styles from './Drawer.module.scss';
import classNames from 'classnames/bind';
import { useDrawer } from '../../hooks';
import Loader from '../../../../ui/Loader';
const cx = classNames.bind(styles);

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  header: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  isLoading: pt.bool,
};

const Drawer = ({ children, header, isLoading = false, ...rest }) => {
  const { className, ...props } = rest;
  // Instead of using the normal return, we put all of our
  // drawer logic here to go into context
  useDrawer(
    <div
      {...props}
      className={cx(className, {
        Drawer: true,
        loading: isLoading,
      })}
    >
      {header && <h3 className={styles.Heading}>{header}</h3>}
      {children}

      {isLoading && !children && <Loader />}
    </div>
  );

  // We do not want the drawer to actually render anything
  // on its own, so we return null
  return null;
};

Drawer.propTypes = propTypes;
Drawer.displayName = 'AdminStructure.Drawer';

export default Drawer;
