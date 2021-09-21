import React from 'react';
import styles from './SuspenseFallback.module.scss';

const SuspenseFallback = () => {
  return (
    <div className={styles._}>
      <div className={styles.Ripple}>
        <div />
        <div />
      </div>
    </div>
  );
};

export default SuspenseFallback;
