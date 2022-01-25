import React from 'react';
import pt from 'prop-types';

import styles from '../Dashboard.module.scss';

const propTypes = {
  message: pt.string,
};

const WidgetError = ({ message }) => {
  return (
    <div className={styles.Error}>
      <h4>Error</h4>
      {message}
    </div>
  );
};

WidgetError.propTypes = propTypes;

export default WidgetError;
