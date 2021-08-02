import React, { useContext } from 'react';
import { Input } from 'reakit/Input';
import pt from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
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
  value: pt.oneOfType([pt.object, pt.array, pt.string]),
};

const DataJson = ({
  attribute,
  isEditable = true,
  isLabeled = true,
  label,
  value,
  ...rest
}) => {
  const { isEditing, formMethods } = useContext(ModuleContext);
  const jsonValue = JSON.stringify(value, null, 4);

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
        {...rest}
        {...ariaLabel}
        as={TextareaAutosize}
        className={styles.Input}
        defaultValue={jsonValue}
        id={attribute || label}
        name={attribute || label}
        ref={formMethods?.register}
      />
    </>
  );

  const renderDisplay = (
    <span>
      {label && isLabeled && (
        <span className={styles.Label}>{label || attribute}</span>
      )}
      <span className={styles.Input} style={{ whiteSpace: 'pre' }} {...rest}>
        {jsonValue}
      </span>
    </span>
  );

  // Do not render an editable input if the module is not editable
  return (
    <ErrorBoundary>
      <div className={styles.TextArea}>
        {isEditing && isEditable ? renderEditing : renderDisplay}
      </div>
    </ErrorBoundary>
  );
};

DataJson.propTypes = propTypes;
DataJson.displayName = 'json';

export { propTypes };
export default DataJson;
