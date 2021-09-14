import React from 'react';
import DataDate from './DataDate';
import ModuleSandbox from '../ModuleSandbox';

const DisplayDataDate = ({ isEditing, value, ...rest }) => (
  <ModuleSandbox isEditing={isEditing}>
    <DataDate
      {...rest}
      label='Date'
      max={'2021-07-25'}
      min={'2021-07-23'}
      value={value}
    />
  </ModuleSandbox>
);

const DataDateModule = () => {
  return (
    <>
      <div>
        <h1>Date input field</h1>
        <p>
          This fixture is for testing the presentation of an input date field
        </p>
      </div>

      <hr />

      <div>
        <h2>Display</h2>
        <DisplayDataDate value={'2021-07-24'} />
      </div>

      <div>
        <h2>Editing</h2>
        <DisplayDataDate isEditing value={'2021-07-24'} />
      </div>
    </>
  );
};

export { DisplayDataDate };
export default <DataDateModule />;
