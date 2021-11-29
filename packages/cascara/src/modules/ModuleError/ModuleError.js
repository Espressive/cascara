import React from 'react';
import pt from 'prop-types';
import styles from '../DataModule.module.scss';
import classnames from 'classnames/bind';

const propTypes = {
  className: pt.string,
  moduleName: pt.string.isRequired,
  moduleOptions: pt.arrayOf(pt.object).isRequired,
};

const cx = classnames.bind(styles);

const ModuleError = ({ className, moduleName, moduleOptions }) => {
  const message = `${moduleName} is not a valid value for module. Try using one of [${moduleOptions.join(
    ', '
  )}]`;

  // eslint-disable-next-line no-console -- we need to display this error to develop
  console.error(message);

  return (
    <div className={cx(className, 'Error')} data-testid={'module-error'}>
      {message}
    </div>
  );
};

ModuleError.propTypes = propTypes;

export default ModuleError;
