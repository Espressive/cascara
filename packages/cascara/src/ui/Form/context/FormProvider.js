import React from 'react';
import pt from 'prop-types';
import { useForm } from 'react-hook-form';

import { ModuleContext, ModuleProvider } from '../../../modules/context';

const propTypes = {
  children: pt.oneOfType([pt.element, pt.arrayOf(pt.element)]),
  // eslint-disable-next-line react/forbid-prop-types -- We do not know what the object params might be in this case
  value: pt.object,
};

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

FormProvider.propTypes = propTypes;

export default FormProvider;
