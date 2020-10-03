import React, { useContext } from 'react';
import { ModuleContext } from '../context';
import styles from '../DataModule.module.scss';

const DataCheckbox = ({
  isEditable = true,
  value,
  label = 'DataCheckbox',
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
        type='checkbox'
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
    <div className={styles.Checkbox}>
      {isEditing && isEditable ? renderEditing : renderDisplay}
    </div>
  );
};

export default DataCheckbox;
