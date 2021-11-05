import React from 'react';
import pt from 'prop-types';
import { Role } from 'reakit/Role';
import styles from './AreaPlaceholder.module.scss';

const propTypes = {
  children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)]),
  /** Color of the border */
  color: pt.string,
  /** Label for the container */
  label: pt.string,
  /** Label can have style */
  // eslint-disable-next-line react/forbid-prop-types -- We do not know what the object params might be in this case
  style: pt.object,
};

const AreaPlaceholder = ({
  children,
  label,
  style,
  color = '#333',
  ...rest
}) => (
  <Role
    {...rest}
    className={styles.Container}
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
