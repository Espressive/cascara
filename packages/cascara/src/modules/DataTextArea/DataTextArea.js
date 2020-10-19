import React, { useContext } from 'react';
import pt from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import { ModuleContext } from '../context';
import styles from '../DataModule.module.scss';

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

const DataTextArea = ({
  isEditable = true,
  isLabeled = true,
  label,
  value,
  ...rest
}) => {
  const { isEditing, formMethods } = useContext(ModuleContext);

  const renderEditing = (
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label htmlFor={label}>
      {label && isLabeled && <span className={styles.Label}>{label}</span>}
      <TextareaAutosize
        {...rest}
        className={styles.Input}
        defaultValue={value}
        id={label}
        name={label}
        ref={formMethods?.register}
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
    <div className={styles.TextArea}>
      {isEditing && isEditable ? renderEditing : renderDisplay}
    </div>
  );
};

DataTextArea.propTypes = propTypes;

export default DataTextArea;
