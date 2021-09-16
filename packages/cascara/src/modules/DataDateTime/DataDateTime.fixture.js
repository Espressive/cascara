import React from 'react';
import DataDateTime from './DataDateTime';
import ModuleSandbox from '../ModuleSandbox';

const DataDateTimeSandbox = ({ isEditing, ...rest }) => (
  <ModuleSandbox isEditing={isEditing}>
    <DataDateTime {...rest} />
  </ModuleSandbox>
);

const dataTimeValue = '2018-06-12T19:30';

const displayProps = {
  label: 'Display',
  value: dataTimeValue,
};

const editingProps = {
  isEditing: true,
  label: 'Editing',
  max: '2018-06-14T00:00',
  min: '2018-06-07T00:00',
  value: dataTimeValue,
};

// These can be used in tests
export { displayProps, editingProps };

// These are our fixtures
export default {
  display: <DataDateTimeSandbox {...displayProps} />,
  displayNoLabel: <DataDateTimeSandbox {...displayProps} isLabeled={false} />,
  editing: <DataDateTimeSandbox {...editingProps} />,
  editingNoLabel: <DataDateTimeSandbox {...editingProps} isLabeled={false} />,
};
