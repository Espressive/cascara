import React from 'react';
import { Role } from 'reakit/Role';

import styles from '../DataModule.module.scss';

const ModuleErrorFallback = () => {
  return (
    <Role className={styles.Error} role='alert'>
      Error
    </Role>
  );
};

export default ModuleErrorFallback;
