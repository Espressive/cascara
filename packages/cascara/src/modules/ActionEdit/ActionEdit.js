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
  const { isEditing, setIsEditing, formMethods, record, onAction } = useContext(
    ModuleContext
  );
  const { handleSubmit, formState, reset } = formMethods;
  const { isDirty, isSubmitting } = formState;

  /**
   * this seems like ugly, we need to find a better way
   * to ease testing.. */
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
      {
        actionName: 'edit.cancel',
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
        actionName: 'edit.start',
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
        actionName: 'edit.save',
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
        className='ui negative icon button'
        loading={isSubmitting}
        onClick={handleCancel}
        type='button'
        {...cancelTestId}
      >
        <Icon name='delete' />
      </Button>
      <Button
        className='ui positive icon button'
        disabled={!isDirty}
        loading={isSubmitting}
        onClick={handleSubmit(onSubmit)}
        type='button'
        {...saveTestId}
      >
        <Icon name='check' />
      </Button>
    </>
  ) : (
    <Button
      className='ui basic button'
      onClick={handleEdit}
      type='button'
      {...editTestId}
    >
      {editLabel}
    </Button>
  );
};

ActionEdit.propTypes = propTypes;

export { propTypes };
export default ActionEdit;
