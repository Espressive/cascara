import React, { useContext } from 'react';
import { Checkbox } from 'reakit/Checkbox';
import pt from 'prop-types';
import { ModuleContext } from '../context';
import useToggle from '../../hooks/useToggle';
import styles from '../DataModule.module.scss';

import ErrorBoundary from '../../shared/ErrorBoundary';
import { getAttributeValueFromRecord } from '../../shared/recordUtils';

const propTypes = pt.shape({
  /** A module can have an Attribute, which will be used as form field name */
  attribute: pt.string,
  /** A Module can be defined to not present an editing state */
  isEditable: pt.bool,
  /** Presents the input without a label. NOT USER CONFIGURABLE */
  isLabeled: pt.bool,
  /** A Module needs to have a unique label relative to its context */
  label: pt.string,
});

const DataCheckbox = ({
  attribute,
  isEditable = true,
  isLabeled = true,
  label,
  ...rest
}) => {
  const { isEditing, formMethods, record } = useContext(ModuleContext);
  const value = getAttributeValueFromRecord(attribute, record);
  const [isChecked, setIsChecked] = useToggle(Boolean(value));

  const renderEditing = (
    <label htmlFor={label}>
      {isLabeled && label && <span className={styles.Label}>{label}</span>}
      <Checkbox
        {...rest}
        checked={isChecked}
        className={styles.Input}
        id={label}
        name={attribute || label}
        onClick={setIsChecked}
        ref={formMethods?.register}
        type='checkbox'
      />
      {label && isLabeled && <span className={styles.LabelText}>{label}</span>}
    </label>
  );

  const renderDisplay = (
    <span>
      <span
        className={styles.Input}
        data-checked={isChecked ? true : undefined}
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
