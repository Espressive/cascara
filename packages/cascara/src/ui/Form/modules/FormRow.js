import React from 'react';
import styles from '../Form.module.scss';
import ErrorBoundary from '../../../shared/ErrorBoundary';

const FormRow = ({ children }) => {
  return (
    <ErrorBoundary>
      <div className={styles.FormRow}>{children}</div>
    </ErrorBoundary>
  );
};

export default FormRow;
