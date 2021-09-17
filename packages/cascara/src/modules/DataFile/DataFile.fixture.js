import React from 'react';
import DataFile from './DataFile';
import ModuleSandbox from '../ModuleSandbox';

const DataFileSandbox = ({ isEditing, ...rest }) => (
  <ModuleSandbox isEditing={isEditing}>
    <DataFile {...rest} />
  </ModuleSandbox>
);

const displayProps = {
  label: 'Display',
};

const editingProps = {
  isEditing: true,
  label: 'Editing',
};

// These can be used in tests
export { displayProps, editingProps };

// These are our fixtures
export default {
  display: <DataFileSandbox {...displayProps} />,
  displayNoLabel: <DataFileSandbox {...displayProps} isLabeled={false} />,
  editing: <DataFileSandbox {...editingProps} />,
  editingNoLabel: <DataFileSandbox {...editingProps} isLabeled={false} />,
};
