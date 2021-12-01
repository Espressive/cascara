import React from 'react';
import pt from 'prop-types';
import styles from '../DataModule.module.scss';
import classnames from 'classnames/bind';

const propTypes = {
  moduleName: pt.string.isRequired,
  moduleOptions: pt.arrayOf(pt.object).isRequired,
};

const cx = classnames.bind(styles);

const ModuleError = ({ moduleName, moduleOptions, ...rest }) => {
  const message = `${moduleName} is not a valid value for module. Try using one of [${moduleOptions.join(
    ', '
  )}]`;

  // eslint-disable-next-line no-console -- we need to display this error to develop
  console.error(message);

  return (
    <div className={cx('Error', rest.className)} data-testid={'module-error'}>
      {message}
    </div>
  );
};

ModuleError.propTypes = propTypes;

export default ModuleError;
