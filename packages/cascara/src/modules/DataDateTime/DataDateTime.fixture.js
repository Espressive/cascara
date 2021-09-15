import React from 'react';
import DataDateTime from './DataDateTime';
import ModuleSandbox from '../ModuleSandbox';

const DisplayDataDateTime = ({ isEditing, value, ...rest }) => (
  <ModuleSandbox isEditing={isEditing}>
    <DataDateTime {...rest} label='Date Time' value={value} />
  </ModuleSandbox>
);

const dataTimeValue = '2018-06-12T19:30';
const DataDateTimeModule = () => {
  return (
    <>
      <div>
        <h1>Date Time input field</h1>
        <p>
          This fixture is for testing the presentation of an input date time
          field
        </p>
      </div>

      <hr />

      <div>
        <h2>Display</h2>
        <DisplayDataDateTime value={dataTimeValue} />
      </div>

      <div>
        <h2>Editing</h2>
        <DisplayDataDateTime
          isEditing
          max='2018-06-14T00:00'
          min='2018-06-07T00:00'
          value={dataTimeValue}
        />
      </div>
    </>
  );
};

export { DisplayDataDateTime };
export default <DataDateTimeModule />;
