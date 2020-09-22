import React, { useContext } from 'react';
import { Input } from 'semantic-ui-react';
import ModuleContext from '../ModuleContext';

const DataString = ({ isEditable = true, value = 'default', ...rest }) => {
  const { isEditing } = useContext(ModuleContext);

  const renderEditing = <Input defaultValue={value} label={'test'} />;

  const renderDisplay = (
    <>
      {rest.label && <div className='ui large label'>{rest.label}</div>}
      <div style={{ display: 'inline-block', padding: '.5em 1em' }}>
        {value}
      </div>
    </>
  );

  return isEditing ? renderEditing : renderDisplay;
};

export default DataString;
