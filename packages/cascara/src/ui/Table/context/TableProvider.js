import React from 'react';
import { ModuleContext, ModuleProvider } from '../../../modules/context';
import { useForm } from 'react-hook-form';

const TableProvider = ({ children, value, ...props }) => {
  const formMethods = useForm();
  const { handleSubmit } = formMethods;

  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.table(data);

    /** @brian:
     *
     * I am thinking on a way for us to derive the type of action
     * to rise here, depending on which mode we are in:
     *
     * isEditing -> update
     * isCreating -> create
     */
    value.onSubmit(data);
  };

  const mergedValues = {
    ...ModuleContext.defaultValue,
    ...value,
    formMethods,
  };

  return (
    <ModuleProvider value={mergedValues} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </ModuleProvider>
  );
};

export default TableProvider;
