import React from 'react';
import styles from '../../Form.module.scss';
import ErrorBoundary from '../../../../shared/ErrorBoundary';

const ActionBar = ({ actions }) => {
  return (
    <ErrorBoundary>
      <div className={styles.FormActionBar}>{actions}</div>
    </ErrorBoundary>
  );
};

export default ActionBar;
