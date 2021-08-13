import React, { useContext } from 'react';
import { Input } from 'reakit/Input';
import pt from 'prop-types';

import ErrorBoundary from '../../private/ErrorBoundary';
import BaseModule from '../BaseModule';
import { ModuleContext } from '../context';
import styles from '../DataModule.module.scss';

import { getConditionalLabelProps } from '../../lib/getConditionalLabelProps';

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

const DataEmail = ({
  attribute,
  isEditable = true,
  isLabeled = true,
  label,
  value,
  ...rest
}) => {
  const { isEditing, formMethods } = useContext(ModuleContext);

  // do not add aria label if tag is used
  const conditionalLabelProps = getConditionalLabelProps(label, isLabeled);

  const renderEditing = (
    <Input
      {...conditionalLabelProps}
      {...rest}
      className={styles.Input}
      defaultValue={value}
      id={attribute || label}
      name={attribute || label}
      ref={formMethods?.register}
      type='email'
    />
  );

  const renderDisplay = (
    <span {...rest} aria-label={label} className={styles.Input}>
      {value}
    </span>
  );

  // Do not render an editable input if the module is not editable
  return (
    <ErrorBoundary>
      <BaseModule attribute={attribute} isLabeled={isLabeled} label={label}>
        <div className={styles.Email}>
          {isEditing && isEditable ? renderEditing : renderDisplay}
        </div>
      </BaseModule>
    </ErrorBoundary>
  );
};

DataEmail.propTypes = propTypes;

export { propTypes };

export default DataEmail;
