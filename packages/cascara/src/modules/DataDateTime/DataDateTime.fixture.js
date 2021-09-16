import React from 'react';
import DataDateTime from './DataDateTime';
import ModuleSandbox from '../ModuleSandbox';

const DataDateTimeSandbox = ({ isEditing, ...rest }) => (
  <ModuleSandbox isEditing={isEditing}>
    <DataDateTime {...rest} />
  </ModuleSandbox>
);

const dataTimeValue = '2018-06-12T19:30';

export default {
  display: <DataDateTimeSandbox label='Display' value={dataTimeValue} />,
  editing: (
    <DataDateTimeSandbox
      isEditing
      label='Editing'
      max='2018-06-14T00:00'
      min='2018-06-07T00:00'
      value={dataTimeValue}
    />
  ),
};
