/* eslint-disable react/no-multi-comp */
import React from 'react';
import { ModuleProvider } from './context';
import FormProvider from '../ui/Form/context/FormProvider';
import {
  ActionButton,
  ActionEdit,
  DataCheckbox,
  DataEmail,
  DataNumber,
  DataRadio,
  DataSelect,
  DataText,
  DataTextArea,
} from './';

const lorem =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem hic mollitia, fuga ex architecto cumque accusamus tenetur qui odio quam tempora aliquam minima ipsum laborum?';

const ALL_DATA_MODULES = (
  <>
    <DataEmail value='b@bje.co' />
    <DataNumber value={2354} />
    <DataSelect value='Washington' />
    <DataText value={lorem} />
    <DataCheckbox value={true} />
    <DataRadio value={true} />
    <DataTextArea value={lorem} />
  </>
);

const colStyle = {
  display: 'inline-block',
  verticalAlign: 'top',
  width: '50%',
};

const AllModules = ({ data, dataConfig }) => {
  return (
    <div style={{ margin: '1em' }}>
      <div>
        <h1>All Modules POC</h1>
        <p>
          This fixture is for testing the presentation of all modules together
          for consistency.
        </p>
      </div>

      <hr />

      <div style={colStyle}>
        <h2>Data Modules: Display</h2>
        <ModuleProvider>{ALL_DATA_MODULES}</ModuleProvider>
      </div>

      <div style={colStyle}>
        <h2>Data Modules: Editing</h2>
        <ModuleProvider value={{ isEditing: true }}>
          {ALL_DATA_MODULES}
        </ModuleProvider>
      </div>

      <FormProvider>
        <h2>Action Modules</h2>
        <ActionButton />
        <ActionEdit />
      </FormProvider>
    </div>
  );
};

const Fixture = <AllModules />;

export default Fixture;
