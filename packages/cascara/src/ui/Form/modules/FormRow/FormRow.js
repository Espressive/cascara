import React from 'react';
import pt from 'prop-types';

import styles from '../../Form.module.scss';
import ErrorBoundary from '../../../../shared/ErrorBoundary';

const propTypes = {
  children: pt.oneOf([pt.node, pt.arrayOf(pt.node)]),
  ratio: pt.arrayOf(pt.oneOfType([pt.number, pt.string])),
};

const FormRow = ({ children, ratio }) => {
  if (ratio && ratio.length !== children.length) {
    throw new Error(
      'The length of the ratio array must match the number of form row fields'
    );
  }

  const columnRatio =
    ratio?.map((col) => `${col}fr`).join(' ') ||
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

FormRow.propTypes = propTypes;

export default FormRow;
