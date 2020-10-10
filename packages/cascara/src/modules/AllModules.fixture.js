/* eslint-disable react/no-multi-comp */
import React from 'react';
import { ModuleProvider } from './context';
import FormProvider from '../ui/Form/context/FormProvider';
import tableStyles from '../ui/Table/Table.module.scss';
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

const options = [
  {
    label: 'Test A',
    value: 'A',
  },
  {
    label: 'Test B',
    value: 'B',
  },
  {
    label: 'Test C',
    value: 'C',
  },
];

const ALL_DATA_MODULES = (
  <>
    <DataEmail label='Email' value='b@bje.co' />
    <DataNumber label='Number' value={2354} />
    <DataSelect label='Select' options={options} value='Washington' />
    <DataText label='Text' value={lorem} />
    <DataCheckbox label='Checkbox A' value={true} />
    <DataRadio label='Radio' options={options} />
    <DataTextArea label='TextArea' value={lorem} />
  </>
);

const colStyle = {
  display: 'inline-block',
  verticalAlign: 'top',
  width: '50%',
};

const fakeHeader = (
  <tr className={tableStyles.Row}>
    <th className={tableStyles.HeadCell}>DataEmail</th>
    <th className={tableStyles.HeadCell}>DataNumber</th>
    <th className={tableStyles.HeadCell}>DataSelect</th>
    <th className={tableStyles.HeadCell}>DataText</th>
    <th className={tableStyles.HeadCell}>DataCheckbox</th>
    <th className={tableStyles.HeadCell}>DataRadio</th>
    <th className={tableStyles.HeadCell}>DataTextArea</th>
  </tr>
);

const fakeRow = (
  <tr className={tableStyles.Row}>
    <td className={tableStyles.Cell}>
      <DataEmail isLabeled={false} label='Email' value='b@bje.co' />
    </td>
    <td className={tableStyles.Cell}>
      <DataNumber isLabeled={false} label='Number' value={2354} />
    </td>
    <td className={tableStyles.Cell}>
      <DataSelect isLabeled={false} label='Select' value='Washington' />
    </td>
    <td className={tableStyles.Cell}>
      <DataText isLabeled={false} label='Text' value='I like cats.' />
    </td>
    <td className={tableStyles.Cell}>
      <DataCheckbox isLabeled={false} label='Checkbox' value={true} />
    </td>
    <td className={tableStyles.Cell}>
      <DataRadio isLabeled={false} label='Radio' value={true} />
    </td>
    <td className={tableStyles.Cell}>
      <DataTextArea isLabeled={false} label='TextArea' value={lorem} />
    </td>
  </tr>
);

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

      <h2>Table Presentation</h2>
      <table
        className={tableStyles.Table}
        style={{ gridTemplateColumns: `repeat(7, auto)` }}
      >
        <thead className={tableStyles.HeadContainer}>{fakeHeader}</thead>
        <tbody className={tableStyles.BodyContainer}>
          {fakeRow}
          {fakeRow}
          {fakeRow}
          {fakeRow}
          {fakeRow}
          {fakeRow}
          {fakeRow}
        </tbody>
      </table>
    </div>
  );
};

const Fixture = <AllModules />;

export default Fixture;
