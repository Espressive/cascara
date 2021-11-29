import React from 'react';
import pt from 'prop-types';
import classnames from 'classnames/bind';

import styles from '../Dashboard.module.scss';

const propTypes = {
  className: pt.string,
  message: pt.string,
};

const cx = classnames.bind(styles);

const WidgetError = ({ className, message }) => {
  return (
    <div className={cx(className, 'Error')}>
      <h4>Error</h4>
      {message}
    </div>
  );
};

WidgetError.propTypes = propTypes;

export default WidgetError;
