/* eslint-disable react/no-multi-comp */
import React, { useContext } from 'react';
import ReusableModuleContext from './ReusableModuleContext';
import { Button, Divider, Input } from 'semantic-ui-react';

const contextDotStyles = {
  border: '2px dotted transparent',
  margin: '1em 0',
  padding: '2em 1em 1em',
  position: 'relative',
};

const contextLabelStyles = {
  border: '2px dotted #ddd',
  borderLeftWidth: 0,
  borderTopWidth: 0,
  fontSize: '.75rem',
  left: 0,
  padding: '.25em .5em',
  position: 'absolute',
  top: 0,
};

const FormProvider = ({ children, value, ...props }) => {
  const mergedValues = {
    ...ReusableModuleContext.defaultValue,
    ...value,
  };
  return (
    <ReusableModuleContext.Provider value={mergedValues} {...props}>
      <div style={{ ...contextDotStyles, borderColor: 'cyan' }}>
        <h4 style={contextLabelStyles}>Form</h4>
        {children}
      </div>
    </ReusableModuleContext.Provider>
  );
};

const TableProvider = ({ children, value, ...props }) => {
  const mergedValues = {
    ...ReusableModuleContext.defaultValue,
    ...value,
  };
  return (
    <ReusableModuleContext.Provider value={mergedValues} {...props}>
      <div style={{ ...contextDotStyles, borderColor: 'pink' }}>
        <h4 style={contextLabelStyles}>Table</h4>
        {children}
      </div>
    </ReusableModuleContext.Provider>
  );
};

const RowProvider = ({ children, value, ...props }) => {
  const grandparentValues = useContext(ReusableModuleContext);

  const mergedValues = {
    ...ReusableModuleContext.defaultValue,
    ...grandparentValues,
    ...value,
  };
  return (
    <ReusableModuleContext.Provider value={mergedValues} {...props}>
      <div style={{ ...contextDotStyles, borderColor: 'green' }}>
        <h4 style={contextLabelStyles}>Row</h4>
        {children}
      </div>
    </ReusableModuleContext.Provider>
  );
};

const DataModule = ({ isEditable = true, value = 'default', ...rest }) => {
  const { isEditing } = useContext(ReusableModuleContext);

  // const handleTrim = () => do stuff

  const renderEditing = <Input defaultValue={value} label={'test'} />;

  const renderDisplay = (
    <>
      {rest.label && <div className='ui large label'>{rest.label}</div>}
      <div style={{ display: 'inline-block', padding: '.5em 1em' }}>
        {value}
      </div>
    </>
  );

  return isEditing ? renderEditing : renderDisplay;
};

const ActionModule = ({ content = 'ActionModule', ...rest }) => {
  const { isEditing } = useContext(ReusableModuleContext);

  return (
    <Button
      basic
      content={isEditing ? 'cancel' : content}
      floated='right'
      {...rest}
    />
  );
};

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
    <DataModule label={label} value={defaultValue} />
    <ActionModule content='Edit' />
  </RowProvider>
);

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
        <DataModule value='Form' />
        <div
          style={{
            backgroundColor: '#f3f3f3',
            margin: '0 -1em -1em',
            padding: '1em',
          }}
        >
          <ActionModule content='Save' />
          <ActionModule content='Cancel' />
          <Divider clearing fitted hidden />
        </div>
      </FormProvider>

      <TableProvider
        value={{
          // This unique value will get added to the provider below
          fromGrandparent: 'hello',
          // The type will get overridden in the provider below
          type: 'grandparent',
        }}
      >
        <DataModule value='Table' />
        {fakeTableData.map((row, i) => (
          <FakeRow {...row} />
        ))}
      </TableProvider>
    </div>
  );
};

const Fixture = <ContextComposableActions />;

export default Fixture;
