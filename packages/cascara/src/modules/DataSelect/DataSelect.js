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
});

const DataSelect = ({
  attribute,
  isEditable = true,
  isLabeled = true,
  label,
  options,
  ...rest
}) => {
  const { isEditing, formMethods, record } = useContext(ModuleContext);
  const value = getAttributeValueFromRecord(attribute, record);

  const renderEditing = (
    <label htmlFor={label}>
      {label && isLabeled && <span className={styles.Label}>{label}</span>}
      <Input
        {...rest}
        as='select'
        className={styles.Input}
        defaultValue={value}
        id={label}
        name={attribute || label}
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
      </Input>
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
    <ErrorBoundary>
      <div className={styles.Select}>
        {isEditing && isEditable ? renderEditing : renderDisplay}
      </div>
    </ErrorBoundary>
  );
};

DataSelect.propTypes = propTypes;

export { propTypes };
export default DataSelect;
