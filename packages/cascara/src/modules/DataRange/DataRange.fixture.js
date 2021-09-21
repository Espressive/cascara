import React from 'react';
import DataRange from './DataRange';
import ModuleSandbox from '../ModuleSandbox';

const DataRangeSandbox = ({ isEditing, ...rest }) => (
  <ModuleSandbox isEditing={isEditing}>
    <DataRange {...rest} />
  </ModuleSandbox>
);

const rangeValue = '7';

const displayProps = {
  label: 'Display',
  value: rangeValue,
};

const editingProps = {
  isEditing: true,
  label: 'Editing',
  min: '0',
  max: '11',
  value: rangeValue,
  step: '1',
};

// These can be used in tests
export { displayProps, editingProps };

export default {
  display: <DataRangeSandbox {...displayProps} />,
  displayNoLabel: <DataRangeSandbox {...displayProps} isLabeled={false} />,
  editing: <DataRangeSandbox {...editingProps} />,
  editingNoLabel: <DataRangeSandbox {...editingProps} isLabeled={false} />,
};
