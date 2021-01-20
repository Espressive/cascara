import React, { useState } from 'react';
import pt from 'prop-types';
// import styles from './Form.module.scss';

import ErrorBoundary from '../../shared/ErrorBoundary';
import FormProvider from './context/FormProvider';
import ModuleError from '../../modules/ModuleError';

import { actionModules, dataModules } from '../../modules/ModuleKeys';
import { formActionModules, formModules } from './modules';
import ActionBar from './atoms/ActionBar';

const bundledActionModules = {
  ...actionModules,
  ...formActionModules, // Spread our component specific modules last just in case there is a conflict from globals
};
const formDataModules = {
  ...dataModules,
  ...formModules, // Spread our component specific modules last just in case there is a conflict from globals
};
const actionModuleOptions = Object.keys(bundledActionModules);
const dataModuleOptions = Object.keys(formDataModules);

const propTypes = {
  /** An object of modules to display.
   *
   * Every parameter in this object can potentially be rendered in the form. */
  data: pt.shape({}),

  /** The main configuration for your form. Here you can specify fields or rows of fields to display as well as the actions to take on the form itself. */
  dataConfig: pt.shape({
    /** Actions will be appended to each row, they'll appear as buttons. */
    actions: pt.arrayOf(
      pt.shape({
        module: pt.oneOf(actionModuleOptions).isRequired,
      })
    ),

    /** Here you can describe each of the visible columns in your table. */
    display: pt.arrayOf(
      pt.shape({
        module: pt.oneOf(dataModuleOptions).isRequired,
      })
    ),
  }).isRequired,

  /** A form can start in an editing state */
  isInitialEditing: pt.bool,

  /** Event handler.
   *
   * An event handler you can pass to handle every event your table emits.*/
  onAction: pt.func,

  /** Unique ID Attribute.
   *
   * specifies the attribute that uniquely identifies every object in the 'data' array. */
  uniqueIdAttribute: pt.string,
};

const formFields = (display, data) => {
  const renderField = (field) => {
    const { module, label, ...rest } = field;
    const Module = dataModules[module];
    const moduleValue = data[field.attribute];

    return Module ? (
      <Module {...rest} key={label} label={label} value={moduleValue} />
    ) : (
      <ModuleError moduleName={module} moduleOptions={dataModuleOptions} />
    );
  };

  const renderFields = (fields) => fields.map((field) => renderField(field));

  return display.map((field, i) => {
    const { module } = field;

    // Check to see if we have a form module, which will probably only be a FormRow
    const FormModule = formModules[module];

    return Boolean(FormModule) ? (
      // TODO: We should concat the form ID with this row index for a more robust key value
      <FormModule key={i}>{renderFields(field.fields)}</FormModule>
    ) : (
      renderField(field)
    );
  });
};

const Form = ({
  data,
  dataConfig,
  onAction,
  uniqueIdAttribute,
  isInitialEditing = false,
  ...rest
}) => {
  const { display } = dataConfig;
  return (
    <ErrorBoundary>
      <FormProvider
        value={{
          data,
          dataConfig,
          isEditing: isInitialEditing,
          onAction,
          uniqueIdAttribute,
        }}
        {...rest}
      >
        {formFields(display, data)}
      </FormProvider>
    </ErrorBoundary>
  );
};

Form.propTypes = propTypes;
Form.displayName = 'Form';

export default Form;
