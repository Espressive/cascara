import React, { useContext } from 'react';
import { Input } from 'reakit/Input';
import pt from 'prop-types';
import { ModuleContext } from '../context';
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
  /** A Module can have a value */
  value: pt.bool,
});

const DataText = ({
  attribute,
  isEditable = true,
  isLabeled = true,
  label,
  value,
  ...rest
}) => {
  const { isEditing, formMethods, record } = useContext(ModuleContext);
  const finalValue =
    attribute && record
      ? getAttributeValueFromRecord(attribute, record)
      : value;

  const renderEditing = (
    <label htmlFor={label}>
      {label && isLabeled && <span className={styles.Label}>{label}</span>}
      <Input
        {...rest}
        className={styles.Input}
        defaultValue={finalValue}
        id={label}
        name={attribute || label}
        ref={formMethods?.register}
        type='text'
      />
    </label>
  );

  const renderDisplay = (
    <span>
      {label && isLabeled && <span className={styles.Label}>{label}</span>}
      <span className={styles.Input}>{finalValue}</span>
    </span>
  );

  // Do not render an editable input if the module is not editable
  return (
    <ErrorBoundary>
      <div className={styles.Text}>
        {isEditing && isEditable ? renderEditing : renderDisplay}
      </div>
    </ErrorBoundary>
  );
};

DataText.propTypes = propTypes;

export { propTypes };
export default DataText;
