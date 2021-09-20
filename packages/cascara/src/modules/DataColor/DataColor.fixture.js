import React from 'react';
import DataColor from './DataColor';
import ModuleSandbox from '../ModuleSandbox';

const DataColorSandbox = ({ isEditing, ...rest }) => (
  <ModuleSandbox isEditing={isEditing}>
    <DataColor {...rest} />
  </ModuleSandbox>
);

const colorValue = '#f6b73c';

const displayProps = {
  label: 'Display',
  value: colorValue,
};

const editingProps = {
  isEditing: true,
  label: 'Editing',
  value: colorValue,
};

// These can be used in tests
export { displayProps, editingProps };

export default {
  display: <DataColorSandbox {...displayProps} />,
  displayNoLabel: <DataColorSandbox {...displayProps} isLabeled={false} />,
  editing: <DataColorSandbox {...editingProps} />,
  editingNoLabel: <DataColorSandbox {...editingProps} isLabeled={false} />,
};
