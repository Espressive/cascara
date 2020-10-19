/* eslint-disable react/no-multi-comp */
import React from 'react';
import DataText from '../DataText';
import ActionButton from '../ActionButton';
import ActionEdit from '../ActionEdit';
import { Divider } from 'semantic-ui-react';
import AreaPlaceholder from '../../placeholders/AreaPlaceholder';
import FormProvider from '../../ui/Form/context/FormProvider';
import RowProvider from '../../ui/Table/context/RowProvider';
import TableProvider from '../../ui/Table/context/TableProvider';

const fakeTableData = [
  {
    defaultValue: 'green',
    key: 0,
    label: 'color',
  },
  {
    defaultValue: 'blue',
    key: 1,
    label: 'color',
  },
  {
    defaultValue: 'purple',
    key: 2,
    label: 'color',
  },
];

const FakeRow = ({ defaultValue, label, ...rest }) => (
  <RowProvider
    value={{
      data: { defaultValue, label, ...rest },
    }}
  >
    <AreaPlaceholder color='green' label='RowProvider'>
      <DataText label={label} value={defaultValue} />
      <ActionEdit />
    </AreaPlaceholder>
  </RowProvider>
);

const fakeInputLayout = {
  display: 'block',
};

const ContextComposableActions = ({ data, dataConfig }) => {
  return (
    <div style={{ margin: '1em' }}>
      <div>
        <h1>ContextComposableActions POC</h1>
        <p>
          See ContextComposability for more simplified, data only examples about
          context composing patterns. In this example, all of these Form, Table,
          and Row Contexts are created from the same initial context and have
          some special logic happening inside of each of the providers. The use
          cases become more unique in each provider, which allows all of the
          Modules to look for the same base context.
        </p>
        <ul>
          <li>
            Show how using an actual form would work in these scenarios as well
          </li>
        </ul>
      </div>

      <FormProvider>
        <AreaPlaceholder color='cyan' label='FormProvider'>
          <div>
            <DataText
              label='First Name'
              style={fakeInputLayout}
              value='Bobby'
            />
          </div>
          <div>
            <DataText
              label='Last Name'
              style={fakeInputLayout}
              value='Johnson'
            />
          </div>
          <div>
            <DataText
              isEditable={false}
              label='Title'
              style={fakeInputLayout}
              value='Good Worker'
            />
          </div>
          <div
            style={{
              backgroundColor: '#f3f3f3',
              margin: '0 -1em -1em',
              padding: '1em',
              textAlign: 'right',
            }}
          >
            <ActionButton />
            <ActionEdit />
            <Divider clearing fitted hidden />
          </div>
        </AreaPlaceholder>
      </FormProvider>

      <TableProvider
        value={{
          // This unique value will get added to the provider below
          fromGrandparent: 'hello',
          // The type will get overridden in the provider below
          type: 'grandparent',
        }}
      >
        <AreaPlaceholder color='pink' label='TableProvider'>
          <DataText label='Table Level Module' value='Table' />
          <ActionEdit />
          {fakeTableData.map((row, i) => (
            <FakeRow {...row} />
          ))}
        </AreaPlaceholder>
      </TableProvider>
    </div>
  );
};

const Fixture = <ContextComposableActions />;

export default Fixture;
