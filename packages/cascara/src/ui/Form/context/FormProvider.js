import React from 'react';
import { ModuleContext, ModuleProvider } from '../../../modules/context';
import styles from '../Form.module.scss';
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
      <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
        {children}
      </form>
    </ModuleProvider>
  );
};

export default FormProvider;
