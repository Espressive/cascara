import React from 'react';
import { ModuleContext, ModuleProvider } from '../../../modules/context';
import { useForm } from 'react-hook-form';

const TableProvider = ({ children, value, ...props }) => {
  const formMethods = useForm();
  // const { handleSubmit } = formMethods;

  // const onSubmit = (data) => {
  //   // eslint-disable-next-line no-console
  //   console.table(data);

  //   /** @brian:
  //    *
  //    * I am thinking on a way for us to derive the type of action
  //    * to rise here, depending on which mode we are in:
  //    *
  //    * isEditing -> update
  //    * isCreating -> create
  //    */
  //   value.onAction('submit', {
  //     /**
  //      * We cannot pass the whole record because it doesn't
  //      * exist in this context, it is added downstream.
  //      */
  //     // ...value.record,
  //     ...data,
  //   });
  // };

  const mergedValues = {
    ...ModuleContext.defaultValue,
    ...value,
    formMethods,
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
