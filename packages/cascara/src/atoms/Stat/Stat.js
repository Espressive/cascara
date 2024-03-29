import React, { useCallback } from 'react';
import pt from 'prop-types';
import classNames from 'classnames/bind';

import { Clickable, Role } from 'reakit';
import styles from './Stat.module.scss';

const propTypes = {
  /** HTML tag to allow polymorphism */
  as: pt.string,
  /** Stats can have their own css class name */
  className: pt.string,
  /** Stats can be fuild */
  fluid: pt.bool,
  /** Stats can have a label */
  label: pt.string,
  /** Stats can be clickable */
  onClick: pt.func,
  /** Stats can have a sub text */
  sub: pt.oneOfType([pt.number, pt.string]),
  /** Stats can have a value */
  value: pt.oneOfType([pt.number, pt.string]),
};

const cx = classNames.bind(styles);

const Stat = ({ as, className, fluid, onClick, label, value, sub }) => {
  const StatComponent = onClick ? Clickable : Role;

  // Instead of maintaining separate, competing styles for focus, we are setting focus on this clickable item on hover. This may be something we consider doing on other Clickable components with Reakit.
  const handleFocus = useCallback(({ currentTarget, dispatchConfig }) => {
    const { registrationName } = dispatchConfig;

    if (registrationName === 'onMouseEnter') {
      currentTarget.focus();
    } else if (registrationName === 'onMouseLeave') {
      currentTarget.blur();
    }
  }, []);

  return (
    <StatComponent
      as={as}
      className={cx(
        '_',
        {
          clickable: Boolean(onClick),
          fluid: fluid,
        },
        className
      )}
      data-component='Stat'
      disabled={!onClick}
      focusable={Boolean(onClick)}
      key={label}
      onClick={onClick}
      onMouseEnter={handleFocus}
      onMouseLeave={handleFocus}
    >
      <span className={styles.Value}>{value}</span>
      <h4 className={styles.Label}>{label}</h4>
      {sub && <span className={styles.Sub}>{sub}</span>}
    </StatComponent>
  );
};

Stat.propTypes = propTypes;

export { propTypes };
export default Stat;
