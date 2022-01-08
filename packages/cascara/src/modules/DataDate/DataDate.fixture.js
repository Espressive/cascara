import React from 'react';
import DataDate from './DataDate';
import ModuleSandbox from '../ModuleSandbox';

const DisplayDataDate = ({ isEditing, ...rest }) => (
  <ModuleSandbox isEditing={isEditing}>
    <DataDate {...rest} />
  </ModuleSandbox>
);

const value = '2021-07-24';

const displayProps = {
  label: 'Display',
  value: value,
};

const editingProps = {
  isEditing: true,
  label: 'Editing',
  value,
};

// These can be used in tests
export { displayProps, editingProps };

// These are our fixtures
export default {
  display: <DisplayDataDate {...displayProps} />,
  displayNoLabel: <DisplayDataDate {...displayProps} isLabeled={false} />,
  editing: <DisplayDataDate {...editingProps} />,
  editingNoLabel: <DisplayDataDate {...editingProps} isLabeled={false} />,
};
