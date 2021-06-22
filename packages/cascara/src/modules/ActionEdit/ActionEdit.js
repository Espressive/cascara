import React, { useCallback, useContext } from 'react';
import pt from 'prop-types';

import { ModuleContext } from '../context';
import { Button } from 'reakit';
import { InlineIcon } from '@iconify/react';
import { checkIcon, closeIcon, pencilIcon } from '@espressive/icons';
import Tooltip from '../../ui/Tooltip';

const propTypes = {
  /** An optional text label for the cancel button */
  cancelLabel: pt.node,
  /** An optional text label for the edit button */
  editLabel: pt.node,
  /** An optional text label for the save button */
  saveLabel: pt.node,
};

const DEFAULT_EDIT = <InlineIcon icon={pencilIcon} />;
const DEFAULT_CANCEL = <InlineIcon icon={closeIcon} />;
const DEFAULT_SAVE = <InlineIcon icon={checkIcon} />;

const ActionEdit = ({
  cancelLabel = DEFAULT_CANCEL,
  editLabel = DEFAULT_EDIT,
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
  const recordId = uniqueIdAttribute && record && record[uniqueIdAttribute];
  const whenAnotherRowIsEditing = Boolean(idOfRecordInEditMode);

  const handleReset = useCallback(() => {
    if (typeof onAction === 'function') {
      onAction(
        // fake target
        {
          name: 'edit.cancel',
        },
        {
          ...record,
        }
      );
    }
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

    if (typeof onAction === 'function') {
      onAction(
        // fake target
        {
          name: 'edit.start',
        },
        {
          ...record,
        }
      );
    }
    enterEditMode && enterEditMode(recordId);
  }, [enterEditMode, onAction, record, recordId, reset]);

  const onSubmit = useCallback(
    (data) => {
      if (typeof onAction === 'function') {
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
      }
      exitEditMode && exitEditMode();
    },
    [exitEditMode, onAction, record]
  );

  return isEditing ? (
    <>
      <Tooltip content='Cancel' delay={100}>
        <Button
          className='ui negative icon button'
          disabled={isSubmitting}
          name='edit.cancel'
          onClick={handleCancel}
          type='button'
        >
          {cancelLabel}
        </Button>
      </Tooltip>
      <Tooltip content='Save' delay={100}>
        <Button
          className='ui positive icon button'
          disabled={!isDirty || isSubmitting}
          name={'edit.save'}
          onClick={handleSubmit(onSubmit)}
          type='button'
        >
          {saveLabel}
        </Button>
      </Tooltip>
    </>
  ) : (
    <Tooltip content='Edit'>
      <Button
        className='ui basic icon button'
        disabled={whenAnotherRowIsEditing}
        name={'edit.start'}
        onClick={handleEdit}
        type='button'
      >
        {editLabel}
      </Button>
    </Tooltip>
  );
};

ActionEdit.propTypes = propTypes;

export { propTypes };
export default ActionEdit;
