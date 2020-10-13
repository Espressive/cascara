import React, { useContext } from 'react';
import { Checkbox } from 'reakit/Checkbox';
import pt from 'prop-types';
import { ModuleContext } from '../context';
import useToggle from '../../hooks/useToggle';
import styles from '../DataModule.module.scss';

const propTypes = {
  /** A Module can be defined to not present an editing state */
  isEditable: pt.bool,
  /** Presents the input without a label. NOT USER CONFIGURABLE */
  isLabeled: pt.bool,
  /** A Module needs to have a unique label relative to its context */
  label: pt.string.isRequired,
  /** A Module can have a value */
  value: pt.bool,
};

const DataCheckbox = ({
  isEditable = true,
  isLabeled = true,
  label,
  value,
  ...rest
}) => {
  const [isChecked, setIsChecked] = useToggle(value === true ? true : false);
  const { isEditing, formMethods } = useContext(ModuleContext);
  const renderEditing = (
    <label htmlFor={label}>
      {isLabeled && label && <span className={styles.Label}>{label}</span>}
      <Checkbox
        {...rest}
        checked={isChecked}
        className={styles.Input}
        id={label}
        name={label}
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
    <div className={styles.Checkbox}>
      {isEditing && isEditable ? renderEditing : renderDisplay}
    </div>
  );
};

DataCheckbox.propTypes = propTypes;

export default DataCheckbox;
