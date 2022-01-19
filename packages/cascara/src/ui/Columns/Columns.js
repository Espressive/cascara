import React from 'react';
import pt from 'prop-types';
import { Role } from 'reakit';
import classNames from 'classnames/bind';

import Boundaries from '../../system-components/Boundaries';
import styles from './Columns.module.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /** HTML tag to allow polymorphism */
  as: pt.string,
  /** The section content */
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  /** Columns can have css class name */
  className: pt.string,
  /** The number of columns to allocate */
  count: pt.oneOfType([pt.number, pt.oneOf(['auto'])]),
  /** Columns can have inline styles */
  style: pt.shape(pt.object),
};

const Columns = ({
  as = 'div',
  count,
  children,
  className,
  style,
  ...rest
}) => {
  let mergedStyle = {
    columnCount: count,
  };

  if (typeof count === 'number' && style) {
    mergedStyle = {
      ...style,
      ...mergedStyle,
    };
  }

  return (
    <Boundaries>
      <Role
        className={cx('Columns', className, { fixed: Boolean(count) })}
        data-component='Columns'
        style={mergedStyle}
        {...rest}
      >
        {children}
      </Role>
    </Boundaries>
  );
};
Columns.propTypes = propTypes;

export { propTypes };
export default Columns;
