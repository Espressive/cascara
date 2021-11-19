import React from 'react';
import pt from 'prop-types';
import styles from './Drawer.module.scss';
import classNames from 'classnames/bind';
import { useDrawer } from '../../hooks';
import Loader from '../../../../private/Loader';
import Boundaries from '../../../../system-components/Boundaries';
const cx = classNames.bind(styles);

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  header: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  isLoading: pt.bool,
  isPadded: pt.bool,
};

const Drawer = ({
  children,
  header,
  isPadded = true,
  isLoading = false,
  ...rest
}) => {
  const { className, ...props } = rest;
  // Instead of using the normal return, we put all of our
  // drawer logic here to go into context
  useDrawer(
    <Boundaries>
      <div
        {...props}
        className={cx('Drawer', className, {
          loading: isLoading,
          padded: isPadded,
        })}
      >
        {header && <h3 className={cx('Heading')}>{header}</h3>}
        {children}

        {isLoading && !children && <Loader />}
      </div>
    </Boundaries>
  );

  // We do not want the drawer to actually render anything
  // on its own, so we return null
  return null;
};

Drawer.propTypes = propTypes;
Drawer.displayName = 'AdminStructure.Drawer';

export { propTypes };
export default Drawer;
