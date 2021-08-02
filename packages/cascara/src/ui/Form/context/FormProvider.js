/* eslint-disable-next-line eslint-comments/disable-enable-pair -- we need this for the one below */
/* eslint-disable jsx-a11y/no-redundant-roles -- we need this for form to be accessible */

import React from 'react';
import pt from 'prop-types';
import styles from '../Form.module.scss';
import { useForm } from 'react-hook-form';

import { ModuleContext, ModuleProvider } from '../../../modules/context';

const propTypes = {
  children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)]),
  // A form needs to have a name to be accessible
  // see: https://github.com/testing-library/dom-testing-library/issues/474
  name: pt.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types -- We do not know what the object params might be in this case
  value: pt.object,
};

const FormProvider = ({ children, value, name, ...props }) => {
  const formMethods = useForm();
  const { handleSubmit } = formMethods;

  const onSubmit = (data) => {
    return data;
  };

  const mergedValues = {
    ...ModuleContext.defaultValue,
    ...value,
    formMethods,
  };

  return (
    <ModuleProvider value={mergedValues} {...props}>
      <form
        className={styles.Form}
        onSubmit={handleSubmit(onSubmit)}
        role='form'
      >
        {children}
      </form>
    </ModuleProvider>
  );
};

FormProvider.propTypes = propTypes;

export default FormProvider;
