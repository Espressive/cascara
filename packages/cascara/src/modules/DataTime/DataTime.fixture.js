import React from 'react';
import DataTime from './DataTime';
import ModuleSandbox from '../ModuleSandbox';

const DataTimeSandbox = ({ isEditing, ...rest }) => (
  <ModuleSandbox isEditing={isEditing}>
    <DataTime {...rest} />
  </ModuleSandbox>
);

const timeValue = '13:30';

const displayProps = {
  label: 'Display',
  value: timeValue,
};

const editingProps = {
  isEditing: true,
  label: 'Editing',
  value: timeValue,
};

// These can be used in tests
export { displayProps, editingProps };

export default {
  display: <DataTimeSandbox {...displayProps} />,
  displayNoLabel: <DataTimeSandbox {...displayProps} isLabeled={false} />,
  editing: <DataTimeSandbox {...editingProps} />,
  editingNoLabel: <DataTimeSandbox {...editingProps} isLabeled={false} />,
};
