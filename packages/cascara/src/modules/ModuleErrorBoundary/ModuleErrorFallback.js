import React from 'react';

import styles from '../DataModule.module.scss';

const ModuleErrorFallback = () => {
  return (
    <div className={styles.Error} role='alert'>
      Error
    </div>
  );
};

export default ModuleErrorFallback;
