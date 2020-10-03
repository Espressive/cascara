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
  DataSelect,
  DataText,
  DataTextArea,
} from './';

const ALL_DATA_MODULES = (
  <>
    <DataCheckbox />
    <hr />
    <DataEmail />
    <hr />
    <DataNumber />
    <hr />
    <DataSelect />
    <hr />
    <DataText />
    <hr />
    <DataTextArea />
    <hr />
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
