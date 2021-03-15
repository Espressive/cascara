import React from 'react';
import pt from 'prop-types';
import styles from './AdminStructure.module.scss';
import classNames from 'classnames/bind';

import Loader from '../../ui/Loader';
const cx = classNames.bind(styles);

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  header: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  isLoading: pt.bool,
};

const AdminStructureDrawer = ({
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
        Drawer: true,
        loading: isLoading,
      })}
    >
      {header && <h3 className={styles.Heading}>{header}</h3>}
      {children}

      {isLoading && !children && <Loader />}
    </div>
  );
};

AdminStructureDrawer.propTypes = propTypes;
AdminStructureDrawer.displayName = 'AdminStructure.Drawer';

export default AdminStructureDrawer;
