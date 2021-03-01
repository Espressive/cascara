import React from 'react';
import pt from 'prop-types';
import styles from './JsonPlaceholder.module.scss';

const propTypes = {
  /** Accepts a JSON object or array to render */
  data: pt.oneOfType([pt.array, pt.object]).isRequired,
  /** Display Json details open on mount */
  isInitialOpen: pt.bool,
  /** Display a title for the Json */
  title: pt.string,
};

const JsonPlaceholder = ({
  data,
  isInitialOpen = false,
  title = 'JSON',
  ...rest
}) => (
  <details
    {...rest}
    className={
      rest?.className ? `${styles.Details} ${rest.className}` : styles.Details
    }
    open={isInitialOpen}
  >
    <summary className={styles.Summary}>{title}</summary>
    <pre className={styles.Pre}>
      <code>{JSON.stringify(data, null, '  ')}</code>
    </pre>
  </details>
);
JsonPlaceholder.propTypes = propTypes;

export default JsonPlaceholder;
