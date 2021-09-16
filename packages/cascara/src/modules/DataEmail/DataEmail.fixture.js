import React from 'react';
import DataEmail from './DataEmail';
import ModuleSandbox from '../ModuleSandbox';

const DisplayDataEmail = ({ isEditing, value, ...rest }) => (
  <ModuleSandbox isEditing={isEditing}>
    <DataEmail {...rest} label='Email address' value={value} />
  </ModuleSandbox>
);

const emailValue = 'me@email.com';
const DataEmailModule = () => {
  return (
    <>
      <div>
        <h1>Email input field</h1>
        <p>
          This fixture is for testing the presentation of an input email field
        </p>
      </div>

      <hr />

      <div>
        <h2>Display</h2>
        <DisplayDataEmail value={emailValue} />
      </div>

      <div>
        <h2>Editing</h2>
        <DisplayDataEmail isEditing value={emailValue} />
      </div>
    </>
  );
};

export { DisplayDataEmail };
export default <DataEmailModule />;
