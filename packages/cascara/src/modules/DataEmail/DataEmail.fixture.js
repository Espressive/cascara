import React from 'react';
import DataEmail from './DataEmail';
import ModuleSandbox from '../ModuleSandbox';

const DataEmailSandbox = ({ isEditing, ...rest }) => (
  <ModuleSandbox isEditing={isEditing}>
    <DataEmail {...rest} />
  </ModuleSandbox>
);

const emailValue = 'me@email.com';

const displayProps = {
  label: 'Display',
  value: emailValue,
};

const editingProps = {
  isEditing: true,
  label: 'Editing',
  value: emailValue,
};

// These can be used in tests
export { displayProps, editingProps };

export default {
  display: <DataEmailSandbox {...displayProps} />,
  displayNoLabel: <DataEmailSandbox {...displayProps} isLabeled={false} />,
  editing: <DataEmailSandbox {...editingProps} />,
  editingNoLabel: <DataEmailSandbox {...editingProps} isLabeled={false} />,
};
