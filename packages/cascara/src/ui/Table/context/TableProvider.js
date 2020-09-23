import React from 'react';
import ModuleContext from '../../../modules/ModuleContext';
import { useForm } from 'react-hook-form';

const TableProvider = ({ children, value, ...props }) => {
  const formMethods = useForm();

  const mergedValues = {
    ...ModuleContext.defaultValue,
    ...value,
    formMethods,
  };

  const { handleSubmit } = formMethods;

  // eslint-disable-next-line no-console
  const onSubmit = (data) => console.table(data);

  return (
    <ModuleContext.Provider value={mergedValues} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </ModuleContext.Provider>
  );
};

export default TableProvider;
