import React, { useState } from 'react';
import pt from 'prop-types';
// import styles from './Form.module.scss';

import ErrorBoundary from '../../shared/ErrorBoundary';
import FormProvider from './context/FormProvider';
import ModuleError from '../../modules/ModuleError';

import { actionModules, dataModules } from '../../modules/ModuleKeys';
import { formActionModules, formModules } from './modules';
import ActionBar from './atoms/ActionBar';

// there are two types of actions a form supports:
//
// a - actions modules compatible with form
// b - form-specific modules like submit, reset, clear
//
// availableActionModules group them together
const availableActionModules = {
  ...actionModules,
  ...formActionModules,
};
const formDataModules = { ...formModules, ...dataModules };
const actionModuleOptions = Object.keys(availableActionModules);
const dataModuleOptions = Object.keys(formDataModules);

const propTypes = {
  // Actions will be appended to each row, they'll appear as buttons.
  actions: pt.shape({
    modules: pt.arrayOf(
      pt.shape({
        module: pt.oneOf(actionModuleOptions).isRequired,
      })
    ),

    // Resolve allowed actions.
    // A function that returns the actions available to the current state of the form
    resolveAllowedActions: pt.func,
  }),

  // An object of modules to display.
  //
  // Every parameter in this object can potentially be rendered in the form.
  data: pt.shape({}),

  // Here you can describe each of the visible columns in your table.
  // @brian, should we call this `fields` istead?
  dataDisplay: pt.arrayOf(
    pt.shape({
      module: pt.oneOf(dataModuleOptions).isRequired,
    })
  ),

  // a form can be editable
  isEditable: pt.bool,

  // A form can start in an editing state
  isInitialEditing: pt.bool,

  // A form can emit events on every action
  onAction: pt.func,
};

// separates the props into two groups:
//
// - myProps, all props defined in `propTypes`
// - otherProps, the rest of the props
//
// @param {Object} props, the props object to filter
// @param {Object} propTypes, a prop-types definition object
// @returns {object}
const filterProps = (props, propTypes) => {
  const myPropKeys = Object.keys(propTypes);

  return Object.entries(props).reduce(
    (filteredProps, [propName, propValue]) => {
      if (myPropKeys.includes(propName)) {
        filteredProps.myProps[propName] = propValue;
      } else {
        filteredProps.otherProps[propName] = propValue;
      }

      return filteredProps;
    },
    {
      myProps: {},
      otherProps: {},
    }
  );
};

const formFields = (display, data) => {
  const renderField = (field) => {
    const { module, label, ...rest } = field;
    const Module = dataModules[module];
    const moduleValue = data[field.attribute];
    const key = `${module}.${field.attribute}.${moduleValue}`;

    // eslint-disable-next-line react/forbid-foreign-prop-types -- @brian we need to see if this approach is what we want
    const { myProps: moduleProps } = filterProps(rest, Module.propTypes);

    return Module ? (
      <Module {...moduleProps} key={key} label={label} value={moduleValue} />
    ) : (
      <ModuleError moduleName={module} moduleOptions={dataModuleOptions} />
    );
  };

  const renderFields = (fields) => fields.map((field) => renderField(field));

  return display?.map((field, i) => {
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
          <FormModule {...field}>{renderFields(fields)}</FormModule>
        ) : (
          renderField(field)
        )}
      </ErrorBoundary>
    );
  });
};

const renderActions = (actions) =>
  actions?.modules?.map((action, idx) => {
    const { module, ...rest } = action;
    const Action = availableActionModules[module];

    // In certain predefined-action modules in which a label is not required, e.g. `edit`,
    // the following unique key generation fails, as it relies on the label.
    const key = `${idx}.${module}.${rest.label || module}`;

    // TODO: create a function to filter out props that we don't want
    // eslint-disable-next-line react/forbid-foreign-prop-types -- @brian we need to see if this approach is what we want
    const { myProps } = filterProps(rest, Action.propTypes);

    return Action ? (
      <Action key={key} {...myProps} />
    ) : (
      <ModuleError
        key={key}
        moduleName={module}
        moduleOptions={actionModuleOptions}
      />
    );
  });

const Form = ({
  actions,
  data,
  dataDisplay,
  onAction = () => {},
  isEditable: incomingIsEditable,
  isInitialEditing = false,
  ...rest
}) => {
  const renderedActions = renderActions(actions);
  const isEditable =
    typeof incomingIsEditable === 'undefined'
      ? Boolean(actions?.modules?.find((action) => action.module === 'edit'))
      : incomingIsEditable;

  const [isEditing, setIsEtiding] = useState(() =>
    !isEditable ? false : isInitialEditing
  );

  const fields = formFields(dataDisplay, data);
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
          enterEditMode,
          exitEditMode,
          isEditable,
          isEditing,
          onAction,
        }}
        {...rest}
      >
        {fields}
        <ActionBar actions={renderedActions} />
      </FormProvider>
    </ErrorBoundary>
  );
};

Form.propTypes = propTypes;
Form.displayName = 'Form';

export { propTypes };
export default Form;
