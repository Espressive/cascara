import React from 'react';
import DataCheckbox from './DataCheckbox';
import ModuleSandbox from '../ModuleSandbox';

const DataCheckboxSandbox = ({ isEditing, ...rest }) => (
  <ModuleSandbox isEditing={isEditing}>
    <DataCheckbox {...rest} />
  </ModuleSandbox>
);

const displayProps = {
  label: 'Display',
  value: true,
};

const editingProps = {
  isEditing: true,
  label: 'Editing',
};

// These can be used in tests
export { displayProps, editingProps };

export default {
  display: <DataCheckboxSandbox {...displayProps} />,
  displayNoLabel: <DataCheckboxSandbox {...displayProps} isLabeled={false} />,
  editing: <DataCheckboxSandbox {...editingProps} />,
  editingNoLabel: <DataCheckboxSandbox {...editingProps} isLabeled={false} />,
};
