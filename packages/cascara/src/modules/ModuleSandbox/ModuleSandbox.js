import React, { useCallback, useState } from 'react';
import pt from 'prop-types';

import { ModuleProvider } from '../context';

const propTypes = {
  children: pt.oneOfType([pt.node, pt.array]),
  isEditing: pt.bool,
  record: pt.shape({}),
};

const ModuleSandbox = ({ children, isEditing, record = {} }) => {
  const [state, setState] = useState({
    idOfRecordInEditMode: 0,
    isEditing,
    record,
    uniqueIdAttribute: 'eid',
  });

  const enterEditMode = useCallback(() => {
    if (!state?.isEditing) {
      setState({
        ...state,
        isEditing: true,
      });
    }
  }, [state, setState]);

  const exitEditMode = useCallback(() => {
    if (state?.isEditing) {
      setState({
        ...state,
        isEditing: false,
      });
    }
  }, [state, setState]);

  const handleSubmit = useCallback(
    (data) => {
      // eslint-disable-next-line no-console -- we need this as a developer message
      console.log('Edition completed: ', data);

      setState({
        ...state,
        isEditing: false,
        record: data,
      });
    },
    [state, setState]
  );

  const reset = useCallback(() => {
    // eslint-disable-next-line no-console -- we need this as a developer message
    console.log('Edition canceled');
  }, []);

  const onAction = useCallback((action, record) => {
    // eslint-disable-next-line no-console -- we need this as a developer message
    console.log('Action invoked: ', action?.name, record);
  }, []);

  return (
    <ModuleProvider
      value={{
        ...state,
        enterEditMode,
        exitEditMode,
        formMethods: {
          formState: {
            isDirty: false,
            isSubmitting: false,
          },
          handleSubmit,
          reset,
        },
        onAction,
      }}
    >
      {children}
    </ModuleProvider>
  );
};

ModuleSandbox.propTypes = propTypes;

export default ModuleSandbox;
