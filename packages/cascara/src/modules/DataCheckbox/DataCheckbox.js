import React, { useContext } from 'react';
import { Checkbox, useCheckboxState } from 'reakit/Checkbox';
import pt from 'prop-types';

import { ModuleContext } from '../context';
import styles from '../DataModule.module.scss';

import ErrorBoundary from '../../private/ErrorBoundary';

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
  value: pt.bool,
};

const DataCheckbox = ({
  attribute,
  isEditable = true,
  isLabeled = true,
  label,
  value,
  ...rest
}) => {
  const { isEditing, formMethods } = useContext(ModuleContext);
  const checkbox = useCheckboxState({ state: Boolean(value) });

  // do not add aria label if tag is used
  const ariaLabel = isLabeled ? { 'id': label } : { 'aria-label': label };

  const renderEditing = (
    <>
      {label && isLabeled && (
        <label htmlFor={attribute || label}>
          <span className={styles.LabelText}>{label || attribute}</span>
        </label>
      )}
      <Checkbox
        {...ariaLabel}
        {...rest}
        {...checkbox}
        className={styles.Input}
        id={attribute || label}
        name={attribute || label}
        ref={formMethods?.register}
      />
      {label && isLabeled && <span className={styles.LabelText}>{label}</span>}
    </>
  );

  const renderDisplay = (
    <span>
      {label && isLabeled && (
        <span className={styles.LabelText}>{label || attribute}</span>
      )}
      <span
        {...ariaLabel}
        {...rest}
        className={styles.Input}
        data-checked={value ? true : undefined}
      >
        {value}
      </span>
      {label && isLabeled && <span className={styles.LabelText}>{label}</span>}
    </span>
  );

  // Do not render an editable input if the module is not editable
  return (
    <ErrorBoundary>
      <div className={styles.Checkbox}>
        {isEditing && isEditable ? renderEditing : renderDisplay}
      </div>
    </ErrorBoundary>
  );
};

DataCheckbox.propTypes = propTypes;

export { propTypes };
export default DataCheckbox;
