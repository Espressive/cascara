import React from 'react';
import pt from 'prop-types';
import styles from '../DataModule.module.scss';
import classnames from 'classnames/bind';

const propTypes = {
  moduleName: pt.string.isRequired,
};

const cx = classnames.bind(styles);

const ModuleError = ({ moduleName, ...rest }) => {
  return (
    <div className={cx('Error', rest.className)} data-testid={'module-error'}>
      Invalid module. See prop-type error.
    </div>
  );
};

ModuleError.propTypes = propTypes;

export default ModuleError;
