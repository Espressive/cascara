import React from 'react';
import pt from 'prop-types';
import { Role } from 'reakit/Role';
import classnames from 'classnames/bind';

import styles from '../Dashboard.module.scss';

const propTypes = {
  as: pt.string,
  className: pt.string,
  message: pt.string,
};

const cx = classnames.bind(styles);

const WidgetError = ({ as = 'div', className, message, ...rest }) => {
  return (
    <Role {...rest} as={as} className={cx(className, 'Error')}>
      <h4>Error</h4>
      {message}
    </Role>
  );
};

WidgetError.propTypes = propTypes;

export default WidgetError;
