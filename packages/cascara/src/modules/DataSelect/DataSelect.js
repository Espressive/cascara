import React, { useContext } from 'react';
import { ModuleContext } from '../context';
import styles from '../DataModule.module.scss';

const DataSelect = ({
  isEditable = true,
  label = 'DataSelect',
  options,
  value,
  ...rest
}) => {
  const { isEditing, formMethods } = useContext(ModuleContext);

  const renderEditing = (
    <label htmlFor={label}>
      {label && <span className={styles.Label}>{label}</span>}
      <select
        {...rest}
        className={styles.Input}
        defaultValue={value}
        id={label}
        name={label}
        ref={formMethods?.register}
      >
        {options ? (
          options.map((option) => (
            <option key={option.value} {...option}>
              {option.label || option.value}
            </option>
          ))
        ) : (
          <option value={value}>{value}</option>
        )}
      </select>
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
    <div className={styles.Select}>
      {isEditing && isEditable ? renderEditing : renderDisplay}
    </div>
  );
};

export default DataSelect;
