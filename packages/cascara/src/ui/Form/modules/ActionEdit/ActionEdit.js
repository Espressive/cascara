import React, { useContext } from 'react';
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
    isEditing,
    enterEditMode,
    exitEditMode,
    formMethods,
    data,
    onAction,
  } = useContext(ModuleContext);
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
      // fake target
      {
        name: 'edit.cancel',
      },
      {
        ...data,
      }
    );

    exitEditMode();
  };

  const handleCancel = () => {
    isDirty
      ? // eslint-disable-next-line no-restricted-globals
        confirm('Abandon unsaved changes?') && handleReset()
      : handleReset();
  };

  const handleEdit = () => {
    /**
     * FDS-91: We are resetting the form with whatever is in data.
     * We don't know if this is the best way to do it in React. */
    reset({ ...data });
    onAction(
      // fake target
      {
        name: 'edit.start',
      },
      {
        ...data,
      }
    );

    enterEditMode();
  };

  const onSubmit = (incomingData) => {
    onAction(
      // fake target
      {
        name: 'edit.save',
      },
      {
        ...data,
        ...incomingData,
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
