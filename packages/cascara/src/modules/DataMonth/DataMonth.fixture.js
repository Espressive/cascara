import React from 'react';
import DataMonth from './DataMonth';
import ModuleSandbox from '../ModuleSandbox';

const DataMonthSandbox = ({ isEditing, ...rest }) => (
  <ModuleSandbox isEditing={isEditing}>
    <DataMonth {...rest} />
  </ModuleSandbox>
);

const monthValue = '2018-06';

const displayProps = {
  label: 'Display',
  value: monthValue,
};

const editingProps = {
  isEditing: true,
  label: 'Editing',
  max: '2018-08',
  min: '2018-06',
  value: monthValue,
};

// These can be used in tests
export { displayProps, editingProps };

// These are our fixtures
export default {
  display: <DataMonthSandbox {...displayProps} />,
  displayNoLabel: <DataMonthSandbox {...displayProps} isLabeled={false} />,
  editing: <DataMonthSandbox {...editingProps} />,
  editingNoLabel: <DataMonthSandbox {...editingProps} isLabeled={false} />,
};
