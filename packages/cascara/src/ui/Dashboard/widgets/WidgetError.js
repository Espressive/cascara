import React from 'react';
import pt from 'prop-types';
import { Role } from 'reakit/Role';

import styles from '../Dashboard.module.scss';

const propTypes = {
  message: pt.string,
};

const WidgetError = ({ message }) => {
  return (
    <Role className={styles.Error}>
      <h4>Error</h4>
      {message}
    </Role>
  );
};

WidgetError.propTypes = propTypes;

export default WidgetError;
