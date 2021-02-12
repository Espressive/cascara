import React from 'react';
import styles from '../../Form.module.scss';
import ErrorBoundary from '../../../../shared/ErrorBoundary';

const FormRow = ({ children, ratio }) => {
  if (ratio && ratio.length !== children.length) {
    throw new Error(
      'The length of the ratio array must match the number of form row fields'
    );
  }

  const columnRatio =
    ratio?.map((col) => col + 'fr').join(' ') ||
    'repeat(auto-fill, minmax(10em, 1fr))';

  return (
    <ErrorBoundary>
      <div
        className={styles.FormRow}
        style={{ gridTemplateColumns: columnRatio }}
      >
        {children}
      </div>
    </ErrorBoundary>
  );
};

export default FormRow;
