import React, { useContext } from 'react';
import { ModuleContext } from '../context';
import styles from '../DataModule.module.scss';

const DataEmail = ({
  isEditable = true,
  value,
  label = 'DataEmail',
  ...rest
}) => {
  const { isEditing, formMethods } = useContext(ModuleContext);

  const renderEditing = (
    <label htmlFor={label}>
      {label && <span className={styles.Label}>{label}</span>}
      <input
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
      {label && <span className={styles.Label}>{label}</span>}
      <span className={styles.Input}>{value}</span>
    </span>
  );

  // Do not render an editable input if the module is not editable
  return (
    <div className={styles.Email}>
      {isEditing && isEditable ? renderEditing : renderDisplay}
    </div>
  );
};

export default DataEmail;
