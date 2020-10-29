import React, { useContext } from 'react';
import { Input } from 'reakit/Input';
import pt from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
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

const DataTextArea = ({
  attribute,
  isEditable = true,
  isLabeled = true,
  label,
  ...rest
}) => {
  const { isEditing, formMethods, record = {} } = useContext(ModuleContext);
  const value = getAttributeValueFromRecord(attribute, record);

  const renderEditing = (
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label htmlFor={label}>
      {label && isLabeled && <span className={styles.Label}>{label}</span>}
      <Input
        {...rest}
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
      {label && isLabeled && <span className={styles.Label}>{label}</span>}
      <span className={styles.Input}>{value}</span>
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

DataTextArea.propTypes = propTypes;
DataTextArea.displayName = 'textarea';

export { propTypes };
export default DataTextArea;
