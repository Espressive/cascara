import React, { useState } from 'react';
import { ModuleContext, ModuleProvider } from '../../../modules/context';
import { useForm } from 'react-hook-form';

const TableProvider = ({ children, value, ...props }) => {
  const [idOfRecordInEditMode, setIdOfRecordInEditMode] = useState(null);
  const formMethods = useForm();

  function enterEditMode(recordId) {
    setIdOfRecordInEditMode(recordId);
  }

  function exitEditMode() {
    setIdOfRecordInEditMode(null);
  }

  const mergedValues = {
    ...ModuleContext.defaultValue,
    ...value,
    enterEditMode,
    exitEditMode,
    formMethods,
    idOfRecordInEditMode,
  };

  return (
    <ModuleProvider value={mergedValues} {...props}>
      {/**

            it would be great if the form was moved to RowProvider
            so we can get access to the record data.
            
            We need to discuss what is the benefit of having the form wrap all
            rows if only one row is editable at a time.
            //onSubmit={handleSubmit(onSubmit)}
         */}

      <form>{children}</form>
    </ModuleProvider>
  );
};

export default TableProvider;
