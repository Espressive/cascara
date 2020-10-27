import React from 'react';
import pt from 'prop-types';
import styles from '../DataModule.module.scss';

const propTypes = {
  moduleName: pt.string.isRequired,
  moduleOptions: pt.array.isRequired,
};

const ModuleError = ({ moduleName, moduleOptions }) => {
  // eslint-disable-next-line no-console
  console.error(
    moduleName +
      ' is an invalid value for module. Try using one of sdfsdf sdf instead.'
  );

  return <div className={styles.Error}>Invalid module name</div>;
};

ModuleError.propTypes = propTypes;

export default ModuleError;
