import React from 'react';
import { ModuleContext, ModuleProvider } from '../../../modules/context';
import { useForm } from 'react-hook-form';

const FormProvider = ({ children, value, ...props }) => {
  const formMethods = useForm();
  const { handleSubmit } = formMethods;

  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.table(data);
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

export default FormProvider;
