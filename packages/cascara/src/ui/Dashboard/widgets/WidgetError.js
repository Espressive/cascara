import React from 'react';
import styles from '../Dashboard.module.scss';

const WidgetError = ({ message }) => {
  return (
    <div className={styles.Error}>
      <h4>Error</h4>
      {message}
    </div>
  );
};

export default WidgetError;
