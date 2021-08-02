import React, { useContext } from 'react';
import { Input } from 'reakit/Input';
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
  /** Select module can have selectable options */
  options: pt.arrayOf(
    pt.shape({
      key: pt.string,
      text: pt.oneOfType([pt.string, pt.number]),
      value: pt.oneOfType([pt.string, pt.number]),
    })
  ),
  /** A Module can have a value */
  value: pt.string,
};

const DataSelect = ({
  attribute,
  isEditable = true,
  isLabeled = true,
  label,
  options,
  value,
  ...rest
}) => {
  const { isEditing, formMethods } = useContext(ModuleContext);

  // do not add aria label if tag is used
  const ariaLabel = isLabeled ? {} : { 'aria-label': label };

  const renderEditing = (
    <>
      {label && isLabeled && (
        <label htmlFor={attribute || label}>
          <span className={styles.LabelText}>{label || attribute}</span>
        </label>
      )}
      <Input
        {...ariaLabel}
        {...rest}
        as='select'
        className={styles.Input}
        defaultValue={value}
        id={attribute || label}
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
    </>
  );

  const renderDisplay = (
    <span>
      {label && isLabeled && (
        <span className={styles.Label}>{label || attribute}</span>
      )}
      <span className={styles.Input} {...rest}>
        {value}
      </span>
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
