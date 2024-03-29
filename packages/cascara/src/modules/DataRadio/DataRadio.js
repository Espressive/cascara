import React, { useContext } from 'react';
import pt from 'prop-types';
import { Radio, RadioGroup, useRadioState } from 'reakit/Radio';
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
  /** A Radio module can have multiple options */
  options: pt.arrayOf(
    pt.shape({
      label: pt.string,
    })
  ),
  /** A Module can have a value */
  value: pt.bool,
};

const DataRadio = ({
  attribute,
  isEditable = true,
  isLabeled = true,
  label,
  options,
  value,
  ...rest
}) => {
  const { isEditing, formMethods } = useContext(ModuleContext);
  const radio = useRadioState({ state: value });

  const renderRadio = (option) => (
    <label htmlFor={option.label}>
      <Radio
        {...radio}
        className={styles.Input}
        id={option.label}
        name={option.label}
        ref={formMethods?.register}
        type='radio'
        value={option.label}
      />
      {option.label && isLabeled && (
        <span className={styles.LabelText}>{option.label}</span>
      )}
    </label>
  );

  const renderEditing = (
    <RadioGroup
      {...radio}
      {...rest}
      aria-label='fruits'
      className={styles.Radio}
    >
      {options
        ? options.map((option) => renderRadio(option))
        : renderRadio(value)}
    </RadioGroup>
  );

  const renderDisplay = (
    <ModuleErrorBoundary>
      <div className={styles.Radio}>
        <span>
          <span className={styles.Input} {...rest}>
            {value}
          </span>
          {label && isLabeled && (
            <span className={styles.LabelText}>{label}</span>
          )}
        </span>
      </div>
    </ModuleErrorBoundary>
  );

  // Do not render an editable input if the module is not editable
  return isEditing && isEditable ? renderEditing : renderDisplay;
};

DataRadio.propTypes = propTypes;

export { propTypes };
export default DataRadio;
