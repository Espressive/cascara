import React, { useContext } from 'react';
import pt from 'prop-types';

import { ModuleContext } from '../context';
import { Button } from 'semantic-ui-react';

const propTypes = pt.shape({
  cancelLabel: pt.string,
  editLabel: pt.string,
  saveLabel: pt.string,
});

const ActionEdit = ({
  cancelLabel = 'Cancel',
  editLabel = 'Edit',
  saveLabel = 'Save',
}) => {
  const { isEditing, setIsEditing, formMethods, record, onAction } = useContext(
    ModuleContext
  );
  const { handleSubmit, formState, reset } = formMethods;
  const { isDirty, isSubmitting } = formState;

  const handleReset = () => {
    onAction(
      {
        name: 'edit.cancel',
      },
      {
        ...record,
      }
    );

    reset();
    setIsEditing(false);
  };

  const handleCancel = () => {
    isDirty
      ? // eslint-disable-next-line no-restricted-globals
        confirm('Abandon unsaved changes?') && handleReset()
      : handleReset();
  };

  const handleEdit = () => {
    onAction(
      {
        name: 'edit.start',
      },
      {
        ...record,
      }
    );

    setIsEditing(true);
  };

  const onSubmit = (data) => {
    onAction(
      {
        name: 'edit.save',
      },
      {
        ...record,
        ...data,
      }
    );

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
        disabled={!isDirty}
        loading={isSubmitting}
        onClick={handleSubmit(onSubmit)}
        positive
        type='button'
      />
    </>
  ) : (
    <Button basic content={editLabel} onClick={handleEdit} type='button' />
  );
};

ActionEdit.propTypes = propTypes;

export { propTypes };
export default ActionEdit;
