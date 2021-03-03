import React, { useCallback } from 'react';
import { Clickable } from 'reakit';
import styles from '../Dashboard.module.scss';

const WidgetStatsStat = ({ onClick, label, value, sub }) => {
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
    <Clickable
      as='div'
      className={onClick ? styles.ClickableStat : styles.Stat}
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
    </Clickable>
  );
};

WidgetStatsStat.displayName = 'stats.stat';

export default WidgetStatsStat;
