import React from 'react';
import DataPassword from './DataPassword';
import ModuleSandbox from '../ModuleSandbox';

const DataPasswordSandbox = ({ isEditing, ...rest }) => (
  <ModuleSandbox isEditing={isEditing}>
    <DataPassword {...rest} />
  </ModuleSandbox>
);

const passwordValue = 'mypassword';

const displayProps = {
  label: 'Display',
  value: passwordValue,
};

const editingProps = {
  isEditing: true,
  label: 'Editing',
  value: passwordValue,
};

// These can be used in tests
export { displayProps, editingProps };

// These are our fixtures
export default {
  display: <DataPasswordSandbox {...displayProps} />,
  displayNoLabel: <DataPasswordSandbox {...displayProps} isLabeled={false} />,
  editing: <DataPasswordSandbox {...editingProps} />,
  editingNoLabel: <DataPasswordSandbox {...editingProps} isLabeled={false} />,
};
