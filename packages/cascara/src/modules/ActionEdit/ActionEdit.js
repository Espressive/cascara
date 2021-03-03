import React, { useContext } from 'react';
import pt from 'prop-types';

import { ModuleContext } from '../context';
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
  let cancelTestId = {};
  let editTestId = {};
  let saveTestId = {};

  if (typeof dataTestIDs === 'object') {
    cancelTestId['data-testid'] = dataTestIDs['cancel'];
    editTestId['data-testid'] = dataTestIDs['edit'];
    saveTestId['data-testid'] = dataTestIDs['save'];
  }

  const handleReset = () => {
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
  };

  const handleCancel = () => {
    isDirty
      ? // eslint-disable-next-line no-restricted-globals, no-alert -- For now we do not have our own confirmation dialog so we are using native confirms
        confirm('Abandon unsaved changes?') && handleReset()
      : handleReset();
  };

  const handleEdit = () => {
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
  };

  const onSubmit = (data) => {
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
  };

  return isEditing ? (
    <>
      <Button
        {...cancelTestId}
        className='ui negative icon button'
        disabled={isSubmitting}
        onClick={handleCancel}
        type='button'
      >
        <Icon name='delete' />
      </Button>
      <Button
        {...saveTestId}
        className='ui positive icon button'
        disabled={!isDirty || isSubmitting}
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
