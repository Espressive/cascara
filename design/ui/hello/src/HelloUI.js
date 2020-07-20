import React from 'react';
import styles from './HelloUI.module.css';

export function HelloUI({ greeting, name }) {
  return (
    <h1 className={styles._}>
      {greeting}, {name}!
    </h1>
  );
}
