import React from 'react';
import DataText from './DataText';
import ModuleSandbox from '../ModuleSandbox';

const DataTextSandbox = ({ isEditing, ...rest }) => (
  <ModuleSandbox isEditing={isEditing}>
    <DataText {...rest} />
  </ModuleSandbox>
);

const textValue = 'my text value example';

const displayProps = {
  label: 'Display',
  value: textValue,
};

const editingProps = {
  isEditing: true,
  label: 'Editing',
  value: textValue,
};

// These can be used in tests
export { displayProps, editingProps };

// These are our fixtures
export default {
  display: <DataTextSandbox {...displayProps} />,
  displayNoLabel: <DataTextSandbox {...displayProps} isLabeled={false} />,
  editing: <DataTextSandbox {...editingProps} />,
  editingNoLabel: <DataTextSandbox {...editingProps} isLabeled={false} />,
};
