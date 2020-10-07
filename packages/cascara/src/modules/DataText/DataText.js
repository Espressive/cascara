import React, { useContext } from 'react';
import pt from 'prop-types';
import { ModuleContext } from '../context';
import styles from '../DataModule.module.scss';

const propTypes = {
  /** A Module can be defined to not present an editing state */
  isEditable: pt.bool,
  /** A Module can be be defined to not show its label (this should only be used when the label is being presented elsewhere like a table column header) */
  isLabeled: pt.bool,
  /** A Module needs to have a unique label relative to its context */
  label: pt.string.isRequired,
  /** A Module can have a value */
  value: pt.string,
};

const DataText = ({
  isEditable = true,
  isLabeled = true,
  value,
  label = 'DataText',
  ...rest
}) => {
  const { isEditing, formMethods } = useContext(ModuleContext);

  const renderEditing = (
    <label htmlFor={label}>
      {label && isLabeled && <span className={styles.Label}>{label}</span>}
      <input
        {...rest}
        className={styles.Input}
        defaultValue={value}
        id={label}
        name={label}
        ref={formMethods?.register}
        type='text'
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
    <div className={styles.Text}>
      {isEditing && isEditable ? renderEditing : renderDisplay}
    </div>
  );
};

DataText.propTypes = propTypes;

export default DataText;
