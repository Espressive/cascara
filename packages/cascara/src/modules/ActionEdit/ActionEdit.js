import React, { useContext } from 'react';
import ModuleContext from '../ModuleContext';
import { Button } from 'semantic-ui-react';

const ActionEdit = ({
  cancelLabel = 'Cancel',
  editLabel = 'Edit Module',
  saveLabel = 'Save',
}) => {
  const { isEditing, setIsEditing, formMethods } = useContext(ModuleContext);
  const { formState, reset } = formMethods;
  const { isDirty, isSubmitting } = formState;

  const handleReset = () => {
    // console.log('handleReset()');

    reset();
    setIsEditing(false);
  };

  const handleCancel = () => {
    // console.log('handleCancel()');

    isDirty
      ? // eslint-disable-next-line no-restricted-globals
        confirm('Abandon unsaved changes?') && handleReset()
      : handleReset();
  };

  const handleEdit = () => {
    // console.log('handleEdit()');

    setIsEditing(true);
  };

  return isEditing ? (
    <>
      <Button
        basic
        content={cancelLabel}
        loading={isSubmitting}
        negative
        onClick={handleCancel}
        type='button'
      />
      <Button
        content={saveLabel}
        loading={isSubmitting}
        positive
        type='submit'
      />
    </>
  ) : (
    <Button basic content={editLabel} onClick={handleEdit} type='button' />
  );
};

export default ActionEdit;
