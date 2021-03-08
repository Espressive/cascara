import React, { useCallback, useContext } from 'react';
import pt from 'prop-types';

import { ModuleContext } from '../../../../modules/context';
import { Button } from 'reakit';
import { Icon } from 'semantic-ui-react';

const propTypes = {
  cancelLabel: pt.string,
  dataTestIDs: pt.shape({
    cancel: pt.string,
    edit: pt.string,
    save: pt.string,
  }),
  editLabel: pt.string,
  saveLabel: pt.string,
};

const ActionEdit = ({ dataTestIDs, editLabel = 'Edit' }) => {
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

  // this seems like ugly, we need to find a better way
  // to ease testing..
  const cancelTestId = {};
  const editTestId = {};
  const saveTestId = {};

  if (typeof dataTestIDs === 'object') {
    cancelTestId['data-testid'] = dataTestIDs['cancel'];
    editTestId['data-testid'] = dataTestIDs['edit'];
    saveTestId['data-testid'] = dataTestIDs['save'];
  }

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
        {...cancelTestId}
        className='ui negative icon button'
        disabled={isSubmitting}
        name={'edit.cancel'}
        onClick={handleCancel}
        type='button'
      >
        <Icon name='delete' />
      </Button>
      <Button
        {...saveTestId}
        className='ui positive icon button'
        disabled={!isDirty || isSubmitting}
        name={'edit.save'}
        onClick={handleSubmit(onSubmit)}
        type='button'
      >
        <Icon name='check' />
      </Button>
    </>
  ) : (
    <Button
      {...editTestId}
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

export { ActionEdit, propTypes };
export default ActionEdit;
