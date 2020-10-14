import React, { useContext } from 'react';
import { Input } from 'reakit/Input';
import pt from 'prop-types';
import { ModuleContext } from '../context';
import styles from '../DataModule.module.scss';

import ErrorBoundary from '../../shared/ErrorBoundary';

const propTypes = {
  /** A Module can be defined to not present an editing state */
  isEditable: pt.bool,
  /** Presents the input without a label. NOT USER CONFIGURABLE */
  isLabeled: pt.bool,
  /** A Module needs to have a unique label relative to its context */
  label: pt.string.isRequired,
  /** A Module can have a value */
  value: pt.string,
};

const DataEmail = ({
  isEditable = true,
  isLabeled = true,
  label,
  value,
  ...rest
}) => {
  const { isEditing, formMethods } = useContext(ModuleContext);
  const renderEditing = (
    <label htmlFor={label}>
      {label && isLabeled && <span className={styles.Label}>{label}</span>}
      <Input
        {...rest}
        className={styles.Input}
        defaultValue={value}
        id={label}
        name={label}
        ref={formMethods?.register}
        type='email'
      />
    </label>
  );

  const renderDisplay = (
    <span>
      {label && isLabeled && <span className={styles.Label}>{label}</span>}
      <span className={styles.Input}>{value}</span>
    </span>
  );

  // Do not render an editable input if the module is not editable
  return (
    <ErrorBoundary>
      <div className={styles.Email}>
        {isEditing && isEditable ? renderEditing : renderDisplay}
      </div>
    </ErrorBoundary>
  );
};

DataEmail.propTypes = propTypes;

export default DataEmail;
