import React from 'react';
import pt from 'prop-types';

import styles from './Asciagram.module.scss';

const propTypes = {
  /** Accepts an ascii string to render */
  data: pt.oneOfType([pt.array, pt.object]).isRequired,
  /** Display the diagram on mount */
  isInitialOpen: pt.bool,
  /** Display a title for the diagram */
  title: pt.string,
};

const Asciagram = ({
  data,
  isInitialOpen = false,
  title = '...titles are meaningless',
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
      <code>{data}</code>
    </pre>
  </details>
);

Asciagram.propTypes = propTypes;

export default Asciagram;
