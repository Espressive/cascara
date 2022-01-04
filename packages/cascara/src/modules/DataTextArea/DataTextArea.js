import React, { useContext } from 'react';
import { Input } from 'reakit/Input';
import pt from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import { ModuleContext } from '../context';
import styles from '../DataModule.module.scss';

import ModuleErrorBoundary from '../ModuleErrorBoundary';
import getAccessibleLabelSetters from '../helpers';

const propTypes = {
  /** A module can have an Attribute, which will be used as form field name */
  attribute: pt.string,
  /** A Module can be defined to not present an editing state */
  isEditable: pt.bool,
  /** Presents the input without a label. NOT USER CONFIGURABLE */
  isLabeled: pt.bool,
  /** A Module needs to have a unique label relative to its context */
  label: pt.string,
  /** A Module can have a value */
  value: pt.string,
};

const DataTextArea = ({
  attribute,
  isEditable = true,
  isLabeled = true,
  label,
  value,
  ...rest
}) => {
  const { isEditing, formMethods } = useContext(ModuleContext);
  const { setAriaLabel, setHtmlFor } = getAccessibleLabelSetters(
    isLabeled,
    label
  );

  const renderEditing = (
    <label htmlFor={setHtmlFor}>
      {label && isLabeled && <span className={styles.LabelText}>{label}</span>}
      <Input
        {...rest}
        aria-label={setAriaLabel}
        as={TextareaAutosize}
        className={styles.Input}
        defaultValue={value}
        id={label}
        name={attribute || label}
        ref={formMethods?.register}
      />
    </label>
  );

  const renderDisplay = (
    <span>
      {label && isLabeled && <span className={styles.LabelText}>{label}</span>}
      <span aria-label={label} className={styles.TextArea} {...rest}>
        {value}
      </span>
    </span>
  );

  // Do not render an editable input if the module is not editable
  return (
    <ModuleErrorBoundary>
      <div className={styles.TextArea}>
        {isEditing && isEditable ? renderEditing : renderDisplay}
      </div>
    </ModuleErrorBoundary>
  );
};

DataTextArea.propTypes = propTypes;
DataTextArea.displayName = 'textarea';

export { propTypes };
export default DataTextArea;
