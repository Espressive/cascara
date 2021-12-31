import React from 'react';
import DataTextArea from './DataTextArea';
import ModuleSandbox from '../ModuleSandbox';

const DataTextAreaSandbox = ({ isEditing, ...rest }) => (
  <ModuleSandbox isEditing={isEditing}>
    <DataTextArea {...rest} />
  </ModuleSandbox>
);

const textareaValue = 'my long text';

const displayProps = {
  label: 'Display',
  value: textareaValue,
};

const editingProps = {
  isEditing: true,
  label: 'Editing',
  value: textareaValue,
};

// These can be used in tests
export { displayProps, editingProps };

// These are our fixtures
export default {
  display: <DataTextAreaSandbox {...displayProps} />,
  displayNoLabel: <DataTextAreaSandbox {...displayProps} isLabeled={false} />,
  editing: <DataTextAreaSandbox {...editingProps} />,
  editingNoLabel: <DataTextAreaSandbox {...editingProps} isLabeled={false} />,
};
