import React, { useContext } from 'react';
import ModuleContext from '../ModuleContext';

const DataString = ({
  isEditable = true,
  value = 'default',
  label,
  ...rest
}) => {
  const { isEditing, formMethods } = useContext(ModuleContext);

  const { register } = formMethods;

  const renderEditing = (
    <input {...rest} defaultValue={value} name={label} ref={register} />
  );

  const renderDisplay = (
    <>
      {label && <div className='ui large label'>{label}</div>}
      <div style={{ display: 'inline-block', padding: '.5em 1em' }}>
        {value}
      </div>
    </>
  );

  return isEditing ? renderEditing : renderDisplay;
};

export default DataString;
