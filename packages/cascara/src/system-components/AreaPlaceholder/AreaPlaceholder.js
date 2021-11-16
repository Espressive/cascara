import React from 'react';
import pt from 'prop-types';
import styles from './AreaPlaceholder.module.scss';
import { Role } from 'reakit/Role';
import classnames from 'classnames/bind';

const propTypes = {
  as: pt.string,
  children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)]),
  /** Color of the border */
  className: pt.string,
  color: pt.string,
  /** Label for the container */
  label: pt.string,
  /** Label can have style */
  // eslint-disable-next-line react/forbid-prop-types -- We do not know what the object params might be in this case
  style: pt.object,
};

const cx = classnames.bind(styles);

const AreaPlaceholder = ({
  as = 'div',
  children,
  className,
  label,
  style,
  color = '#333',
  ...rest
}) => (
  <Role
    {...rest}
    className={cx(className, 'Container')}
    style={{ ...style, borderColor: color }}
  >
    <h4 className={styles.Label} style={{ borderColor: color }}>
      {label}
    </h4>
    {children}
  </Role>
);

AreaPlaceholder.propTypes = propTypes;

export default AreaPlaceholder;
