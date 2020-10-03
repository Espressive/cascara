import React, { useContext } from 'react';
import { ModuleContext } from '../context';

const DataNumber = ({
  isEditable = true,
  value,
  label = 'DataNumber',
  ...rest
}) => {
  const { isEditing, formMethods } = useContext(ModuleContext);

  const renderEditing = (
    <input
      {...rest}
      defaultValue={value}
      name={label}
      ref={formMethods?.register}
    />
  );

  const renderDisplay = (
    <>
      {label && <div className='ui large label'>{label}</div>}
      <div style={{ display: 'inline-block', padding: '.5em 1em' }}>
        {value}
      </div>
    </>
  );

  // Do not render an editable input if the module is not editable
  return isEditing && isEditable ? renderEditing : renderDisplay;
};

export default DataNumber;
