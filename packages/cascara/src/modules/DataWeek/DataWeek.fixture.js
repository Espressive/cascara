import React from 'react';
import DataWeek from './DataWeek';
import ModuleSandbox from '../ModuleSandbox';

const DataWeekSandbox = ({ isEditing, ...rest }) => (
  <ModuleSandbox isEditing={isEditing}>
    <DataWeek {...rest} />
  </ModuleSandbox>
);

const weekValue = '2021-W01';

const displayProps = {
  label: 'Display',
  value: weekValue,
};

const editingProps = {
  isEditing: true,
  label: 'Editing',
  value: weekValue,
};

// These can be used in tests
export { displayProps, editingProps };

export default {
  display: <DataWeekSandbox {...displayProps} />,
  displayNoLabel: <DataWeekSandbox {...displayProps} isLabeled={false} />,
  editing: <DataWeekSandbox {...editingProps} />,
  editingNoLabel: <DataWeekSandbox {...editingProps} isLabeled={false} />,
};
