import React from 'react';
import pt from 'prop-types';
import styles from '../DataModule.module.scss';

const propTypes = {
  moduleName: pt.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types -- We do not know what the object params might be in this case
  moduleOptions: pt.arrayOf(pt.object).isRequired,
};

const ModuleError = ({ moduleName, moduleOptions }) => {
  const message = `${moduleName} is not a valid value for module. Try using one of [${moduleOptions.join(
    ', '
  )}]`;
  // eslint-disable-next-line no-console
  // console.error(message);

  return (
    <div className={styles.Error} data-testid={'module-error'}>
      {message}
    </div>
  );
};

ModuleError.propTypes = propTypes;

export default ModuleError;
