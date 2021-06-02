import React, { useCallback, useContext } from 'react';
import pt from 'prop-types';

import { ModuleContext } from '../context';
import { Button } from 'reakit';

const propTypes = {
  /** An optional text label for the cancel button */
  cancelLabel: pt.node,
  /** An optional text label for the edit button */
  editLabel: pt.node,
  /** An optional text label for the save button */
  saveLabel: pt.node,
};

const DEFAULT_SAVE = <i aria-hidden='true' className='check icon' />;
const DEFAULT_CANCEL = <i aria-hidden='true' className='delete icon' />;

const ActionEdit = ({
  cancelLabel = DEFAULT_CANCEL,
  editLabel = 'Edit',
  saveLabel = DEFAULT_SAVE,
}) => {
  const {
    idOfRecordInEditMode,
    isEditing,
    enterEditMode,
    exitEditMode,
    formMethods,
    record,
    onAction,
    uniqueIdAttribute,
  } = useContext(ModuleContext);
  const { handleSubmit, formState, reset } = formMethods;
  const { isDirty, isSubmitting } = formState;
  const recordId = record[uniqueIdAttribute];
  const whenAnotherRowIsEditing = Boolean(idOfRecordInEditMode);

  const handleReset = useCallback(() => {
    onAction(
      // fake target
      {
        name: 'edit.cancel',
      },
      {
        ...record,
      }
    );

    exitEditMode();
  }, [exitEditMode, onAction, record]);

  const handleCancel = useCallback(() => {
    isDirty
      ? // eslint-disable-next-line no-restricted-globals, no-alert -- For now we do not have our own confirmation dialog so we are using native confirms
        confirm('Abandon unsaved changes?') && handleReset()
      : handleReset();
  }, [handleReset, isDirty]);

  const handleEdit = useCallback(() => {
    // FDS-91: We are resetting the form with whatever is in record.
    // We don't know if this is the best way to do it in React.
    reset({ ...record });
    onAction(
      // fake target
      {
        name: 'edit.start',
      },
      {
        ...record,
      }
    );

    enterEditMode(recordId);
  }, [enterEditMode, onAction, record, recordId, reset]);

  const onSubmit = useCallback(
    (data) => {
      onAction(
        // fake target
        {
          name: 'edit.save',
        },
        {
          ...record,
          ...data,
        }
      );

      exitEditMode();
    },
    [exitEditMode, onAction, record]
  );

  return isEditing ? (
    <>
      <Button
        className='ui negative icon button'
        disabled={isSubmitting}
        name={'edit.cancel'}
        onClick={handleCancel}
        type='button'
      >
        {cancelLabel}
      </Button>
      <Button
        className='ui positive icon button'
        disabled={!isDirty || isSubmitting}
        name={'edit.save'}
        onClick={handleSubmit(onSubmit)}
        type='button'
      >
        {saveLabel}
      </Button>
    </>
  ) : (
    <Button
      className='ui basic button'
      disabled={whenAnotherRowIsEditing}
      name={'edit.start'}
      onClick={handleEdit}
      type='button'
    >
      {editLabel}
    </Button>
  );
};

ActionEdit.propTypes = propTypes;

export { propTypes };
export default ActionEdit;
