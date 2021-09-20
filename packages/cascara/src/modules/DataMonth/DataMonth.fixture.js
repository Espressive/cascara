import React from 'react';
import DataMonth from './DataMonth';
import ModuleSandbox from '../ModuleSandbox';

const DisplayDataMonth = ({ isEditing, ...rest }) => (
  <ModuleSandbox isEditing={isEditing}>
    <DataMonth {...rest} label='Month' />
  </ModuleSandbox>
);

const DataMonthModule = () => {
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
        <DisplayDataMonth value='2021-06' />
      </div>

      <div>
        <h2>Editing</h2>

        <DisplayDataMonth isEditing name='month' value='2021-06' />
      </div>
    </>
  );
};

export { DisplayDataMonth };
export default <DataMonthModule />;
