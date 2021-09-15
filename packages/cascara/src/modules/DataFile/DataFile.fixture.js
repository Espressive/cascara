import React from 'react';
import DataFile from './DataFile';
import ModuleSandbox from '../ModuleSandbox';

const DisplayDataFile = ({ isEditing, ...rest }) => (
  <ModuleSandbox isEditing={isEditing}>
    <DataFile {...rest} label='Date File' />
  </ModuleSandbox>
);

const DataFileModule = () => {
  return (
    <>
      <div>
        <h1>Date input field</h1>
        <p>
          This fixture is for testing the presentation of an input file field
        </p>
      </div>

      <hr />

      <div>
        <h2>Display</h2>
        <DisplayDataFile />
      </div>

      <div>
        <h2>Editing</h2>
        <DisplayDataFile isEditing />
      </div>
    </>
  );
};

export { DisplayDataFile };
export default <DataFileModule />;
