import React, { useContext } from 'react';
import { Input } from 'reakit/Input';
import pt from 'prop-types';
import { ModuleContext } from '../context';
import styles from '../DataModule.module.scss';

import ModuleErrorBoundary from '../ModuleErrorBoundary';

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

const DataPassword = ({
  attribute,
  isEditable = true,
  isLabeled = true,
  label,
  value,
  ...rest
}) => {
  const { isEditing, formMethods } = useContext(ModuleContext);

  // NOTE: THESE TWO SET DEFINITIONS COULD PROBABLY BECOME A HELPER FUNCTION FOR USE IN ALL MODULES
  // We do not want to add a redundant aria-label property if there
  // is an html label present with a linking `for` attribute.
  const setAriaLabel = isLabeled ? undefined : label;
  // We do not want to set a for attribute if there is no label content
  // because we are defining aria label instead
  const setHtmlFor = isLabeled ? label : undefined;

  const renderEditing = (
    <label htmlFor={setHtmlFor}>
      {label && isLabeled && <span className={styles.LabelText}>{label}</span>}
      <Input
        {...rest}
        aria-label={setAriaLabel}
        className={styles.Input}
        defaultValue={value}
        id={label}
        name={attribute || label}
        ref={formMethods?.register}
        type='password'
      />
    </label>
  );

  const renderDisplay = (
    <span>
      {label && isLabeled && <span className={styles.LabelText}>{label}</span>}
      <span aria-label={label} className={styles.Input} {...rest}>
        ******
      </span>
    </span>
  );

  // Do not render an editable input if the module is not editable
  return (
    <ModuleErrorBoundary>
      <div className={styles.Text}>
        {isEditing && isEditable ? renderEditing : renderDisplay}
      </div>
    </ModuleErrorBoundary>
  );
};

DataPassword.propTypes = propTypes;

export { propTypes };
export default DataPassword;
