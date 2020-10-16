import React, { useContext } from 'react';
import pt from 'prop-types';

import { ModuleContext } from '../context';
import { Button } from 'semantic-ui-react';

const propTypes = {
  cancelLabel: pt.string,
  editLabel: pt.string,
  saveLabel: pt.string,
};

const ActionEdit = ({
  cancelLabel = 'Cancel',
  editLabel = 'Edit',
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

  /** Remove this when demoing! */
  const handleSave = () => {
    setIsEditing(false);
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
        onClick={handleSave} // remove this when demoing
        positive
        type='submit'
      />
    </>
  ) : (
    <Button basic content={editLabel} onClick={handleEdit} type='button' />
  );
};

ActionEdit.propTypes = propTypes;

export { propTypes };
export default ActionEdit;
