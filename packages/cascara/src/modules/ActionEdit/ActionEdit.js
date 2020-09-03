import React, { useContext } from 'react';
import { Button } from 'semantic-ui-react';

const actionModuleContext = [];

const ActionEdit = ({ cancelLabel = 'Cancel', label, saveLabel = 'Save' }) => {
  const { isEditing, toggleEditState } = useContext(actionModuleContext);

  const handleCancel = () => {
    toggleEditState();
  };

  return isEditing ? (
    <>
      <Button content={saveLabel} type='submit' />
      <Button content={cancelLabel} onClick={handleCancel} />
    </>
  ) : (
    <Button content={label} onClick={toggleEditState} />
  );
};

export default ActionEdit;
