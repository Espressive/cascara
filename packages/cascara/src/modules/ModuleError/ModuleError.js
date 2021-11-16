import React from 'react';
import pt from 'prop-types';
import styles from '../DataModule.module.scss';
import { Role } from 'reakit/Role';
import classnames from 'classnames/bind';

const propTypes = {
  as: pt.string,
  className: pt.string,
  moduleName: pt.string.isRequired,
  moduleOptions: pt.arrayOf(pt.object).isRequired,
};

const cx = classnames.bind(styles);

const ModuleError = ({
  as = 'div',
  className,
  moduleName,
  moduleOptions,
  ...rest
}) => {
  const message = `${moduleName} is not a valid value for module. Try using one of [${moduleOptions.join(
    ', '
  )}]`;

  // eslint-disable-next-line no-console -- we need to display this error to develop
  console.error(message);

  return (
    <Role
      {...rest}
      as={as}
      className={cx(className, 'Error')}
      data-testid={'module-error'}
    >
      {message}
    </Role>
  );
};

ModuleError.propTypes = propTypes;

export default ModuleError;
