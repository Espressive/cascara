import React from 'react';
import pt from 'prop-types';
import { Role } from 'reakit';
import classNames from 'classnames/bind';

import Boundaries from '../../system-components/Boundaries';
import styles from './Columns.module.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /** The section content */
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  /** Columns can have css class name */
  className: pt.string,
  /** The number of columns to allocate */
  count: pt.number,
};

const Columns = ({ count = 2, children, className, ...rest }) => (
  <Boundaries>
    <Role
      className={cx('Columns', className)}
      style={{ columnCount: count }}
      {...rest}
    >
      {children}
    </Role>
  </Boundaries>
);

Columns.propTypes = propTypes;

export { propTypes };
export default Columns;
