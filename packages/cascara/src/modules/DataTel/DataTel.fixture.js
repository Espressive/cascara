import React from 'react';
import DataTel from './DataTel';
import ModuleSandbox from '../ModuleSandbox';

const DataTelSandbox = ({ isEditing, ...rest }) => (
  <ModuleSandbox isEditing={isEditing}>
    <DataTel {...rest} />
  </ModuleSandbox>
);

const telValue = '123467890';

const displayProps = {
  label: 'Display',
  value: telValue,
};

const editingProps = {
  isEditing: true,
  label: 'Editing',
  value: '123-456-7890',
  pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
  placeholder: '123-456-7890',
};

// These can be used in tests
export { displayProps, editingProps };

// These are our fixtures
export default {
  display: <DataTelSandbox {...displayProps} />,
  displayNoLabel: <DataTelSandbox {...displayProps} isLabeled={false} />,
  editing: <DataTelSandbox {...editingProps} />,
  editingNoLabel: <DataTelSandbox {...editingProps} isLabeled={false} />,
};
