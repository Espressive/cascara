import React from 'react';
import styles from '../DataModule.module.scss';

const ModuleError = ({ message }) => {
  return <div className={styles.Error}>Error: {message}</div>;
};

export default ModuleError;
