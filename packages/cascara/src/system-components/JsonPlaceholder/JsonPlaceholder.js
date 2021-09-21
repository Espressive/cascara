import React from 'react';
import pt from 'prop-types';
import styles from './JsonPlaceholder.module.scss';
import getStatusFromDataLength from '../../lib/getStatusFromDataLength';
import Empty from '../../private/TemporaryEmpty';
import Loading from '../../private/TemporaryLoading';

const propTypes = {
  /** Accepts a JSON object or array to render */
  data: pt.oneOfType([pt.array, pt.object]),
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
}) => {
  const records = Array.isArray(data)
    ? data.length
    : typeof data === 'object' && data !== null
    ? Object.keys(data).length
    : null;

  const { isEmpty, isLoading } = getStatusFromDataLength(records);

  return (
    <details
      {...rest}
      className={
        rest?.className ? `${styles.Details} ${rest.className}` : styles.Details
      }
      open={isInitialOpen}
    >
      <summary className={styles.Summary}>{title}</summary>
      {isLoading ? (
        <Loading isMinimal />
      ) : isEmpty ? (
        <Empty isMinimal />
      ) : (
        <pre className={styles.Pre}>
          <code>{JSON.stringify(data, null, '  ')}</code>
        </pre>
      )}
    </details>
  );
};

JsonPlaceholder.propTypes = propTypes;

export default JsonPlaceholder;
