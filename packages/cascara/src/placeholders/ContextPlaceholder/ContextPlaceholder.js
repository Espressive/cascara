import React from 'react';
import pt from 'prop-types';
import styles from './ContextPlaceholder.module.scss';

const propTypes = {
  /** Color of the border */
  color: pt.string,
  /** Label for the container */
  label: pt.string,
};

const ContextPlaceholder = ({
  children,
  label,
  style,
  color = '#333',
  ...rest
}) => (
  <div
    {...rest}
    className={styles.Container}
    style={{ ...style, borderColor: color }}
  >
    <h4 className={styles.Label} style={{ borderColor: color }}>
      {label}
    </h4>
    {children}
  </div>
);

ContextPlaceholder.propTypes = propTypes;

export default ContextPlaceholder;
