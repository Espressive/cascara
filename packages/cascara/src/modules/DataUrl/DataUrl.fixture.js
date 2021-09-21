import React from 'react';
import DataUrl from './DataUrl';
import ModuleSandbox from '../ModuleSandbox';

const DataUrlSandbox = ({ isEditing, ...rest }) => (
  <ModuleSandbox isEditing={isEditing}>
    <DataUrl {...rest} />
  </ModuleSandbox>
);

const urlValue = 'http://www.example.com';

const displayProps = {
  label: 'Display',
  value: urlValue,
};

const editingProps = {
  isEditing: true,
  label: 'Editing',
  value: urlValue,
};

// These can be used in tests
export { displayProps, editingProps };

// These are our fixtures
export default {
  display: <DataUrlSandbox {...displayProps} />,
  displayNoLabel: <DataUrlSandbox {...displayProps} isLabeled={false} />,
  editing: <DataUrlSandbox {...editingProps} />,
  editingNoLabel: <DataUrlSandbox {...editingProps} isLabeled={false} />,
};
