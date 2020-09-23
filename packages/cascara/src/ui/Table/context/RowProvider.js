import React, { useContext } from 'react';
import ModuleContext from '../../../modules/ModuleContext';
import { useForm } from 'react-hook-form';

const RowProvider = ({ children, value, ...props }) => {
  const formMethods = useForm();

  const grandparentValues = useContext(ModuleContext);

  const mergedValues = {
    ...ModuleContext.defaultValue,
    ...grandparentValues,
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

export default RowProvider;
