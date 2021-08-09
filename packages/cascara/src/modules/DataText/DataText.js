import React, { useContext } from 'react';
import { Input } from 'reakit/Input';
import pt from 'prop-types';
import { ModuleContext } from '../context';
import styles from '../DataModule.module.scss';

import { getConditionalLabelProps } from '../../lib/getConditionalLabelProps';
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
  value: pt.string,
};

const DataText = ({
  attribute,
  isEditable = true,
  isLabeled = true,
  label,
  value,
  ...rest
}) => {
  const { isEditing, formMethods } = useContext(ModuleContext);

  const conditionalLabelProps = getConditionalLabelProps(label, isLabeled);

  const renderEditing = (
    <>
      {label && isLabeled && (
        <label htmlFor={attribute || label}>
          <span className={styles.LabelText}>{label || attribute}</span>
        </label>
      )}
      <Input
        {...conditionalLabelProps}
        {...rest}
        className={styles.Input}
        defaultValue={value}
        id={attribute || label}
        name={attribute || label}
        ref={formMethods?.register}
        type={'text'}
      />
    </>
  );

  const renderDisplay = (
    <span>
      {label && isLabeled && (
        <span className={styles.LabelText}>{label || attribute}</span>
      )}
      <span {...rest} aria-label={label} className={styles.Input}>
        {value}
      </span>
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
