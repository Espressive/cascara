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
  ...formActionModules,
};
const formDataModules = { ...formModules, ...dataModules };
const actionModuleOptions = Object.keys(bundledActionModules);
const dataModuleOptions = Object.keys(formDataModules);

const propTypes = {
  // An object of modules to display.
  //
  // Every parameter in this object can potentially be rendered in the form.
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

  /** a form can be editable */
  isEditable: pt.bool,

  /** A form can start in an editing state */
  isInitialEditing: pt.bool,

  // Event handler.
  //
  // An event handler you can pass to handle every event your table emits.
  onAction: pt.func,

  // Unique ID Attribute.
  //
  // specifies the attribute that uniquely identifies every object in the 'data' array.
  uniqueIdAttribute: pt.string,
};

const formFields = (display, data) => {
  const renderField = (field) => {
    const { module, label, ...rest } = field;
    const Module = dataModules[module];
    const moduleValue = data[field.attribute];
    const key = `${module}.${field.attribute}.${moduleValue}`;

    return Module ? (
      <Module {...rest} key={key} label={label} value={moduleValue} />
    ) : (
      <ModuleError moduleName={module} moduleOptions={dataModuleOptions} />
    );
  };

  const renderFields = (fields) => fields.map((field) => renderField(field));

  return display.map((field, i) => {
    const { attribute, module, fields = [] } = field;

    // Check to see if we have a form module, which will probably only be a FormRow
    const FormModule = formModules[module];

    const key = fields.reduce(
      (key, { attribute }) => `${key}.${i}.${attribute}`,
      `${attribute ? `field.${module}.${attribute}` : 'row'}`
    );

    return (
      <ErrorBoundary key={key}>
        {FormModule ? (
          <FormModule {...field}>{renderFields(field.fields)}</FormModule>
        ) : (
          renderField(field)
        )}
      </ErrorBoundary>
    );
  });
};

const renderActions = (actions) =>
  actions.map((action, id) => {
    const { module, ...rest } = action;
    const Action = bundledActionModules[module];

    //
    // In certain predefined-action modules in which a label is not required, e.g. `edit`,
    // the following unique key generation fails, as it relies on the label (content).
    const key = `${id}.${module}.${rest.label || module}`;

    return Action ? (
      <Action key={key} {...rest} />
    ) : (
      <ModuleError
        key={key}
        moduleName={module}
        moduleOptions={actionModuleOptions}
      />
    );
  });

const Form = ({
  data,
  dataConfig,
  onAction = () => {},
  uniqueIdAttribute,
  isEditable: incomingIsEditable,
  isInitialEditing = false,
  ...rest
}) => {
  const { actions = [], display } = dataConfig;
  const renderedActions = renderActions(actions);
  const isEditable =
    typeof incomingIsEditable === 'undefined'
      ? Boolean(dataConfig?.actions?.find((action) => action.module === 'edit'))
      : incomingIsEditable;

  const [isEditing, setIsEtiding] = useState(() =>
    !isEditable ? false : isInitialEditing
  );

  function enterEditMode(recordId) {
    setIsEtiding(true);
  }

  function exitEditMode() {
    setIsEtiding(false);
  }

  return (
    <ErrorBoundary>
      <FormProvider
        value={{
          data,
          dataConfig,
          enterEditMode,
          exitEditMode,
          isEditable,
          isEditing,
          onAction,
          uniqueIdAttribute,
        }}
        {...rest}
      >
        {formFields(display, data)}
        <ActionBar actions={renderedActions} />
      </FormProvider>
    </ErrorBoundary>
  );
};

Form.propTypes = propTypes;
Form.displayName = 'Form';

export { propTypes };
export default Form;
