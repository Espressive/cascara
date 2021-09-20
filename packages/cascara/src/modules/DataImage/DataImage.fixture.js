import React from 'react';
import DataImage from './DataImage';
import ModuleSandbox from '../ModuleSandbox';

const DisplayDataImage = ({ isEditing, value, ...rest }) => (
  <ModuleSandbox isEditing={isEditing}>
    <DataImage {...rest} label='My button' />
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
        <p>Button will not be displayed</p>
        <DisplayDataImage />
      </div>

      <div>
        <h2>Editing</h2>
        <p>
          <code>src:</code> Path of the image
          <code> alt:</code> Button text name
        </p>
        <DisplayDataImage
          alt='example'
          isEditing
          src='/media/examples/my-button.png'
        />
      </div>
    </>
  );
};

export { DisplayDataImage };
export default <DataDateModule />;
