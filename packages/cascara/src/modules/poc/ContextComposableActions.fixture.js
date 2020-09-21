/* eslint-disable react/no-multi-comp */
import React, { useContext } from 'react';
import ReusableModuleContext from './ReusableModuleContext';
import { Button, Input } from 'semantic-ui-react';

const FormProvider = ({ children, value, ...props }) => {
  const mergedValues = {
    ...ReusableModuleContext.defaultValue,
    ...value,
  };
  return (
    <ReusableModuleContext.Provider value={mergedValues} {...props}>
      <div
        style={{
          border: '2px dotted cyan',
          margin: '1em 0',
          padding: '1em',
        }}
      >
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
      <div
        style={{
          border: '2px dotted pink',
          margin: '1em 0',
          padding: '1em',
        }}
      >
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
      <div
        style={{
          border: '2px dotted green',
          margin: '1em 0',
          padding: '1em',
        }}
      >
        {children}
      </div>
    </ReusableModuleContext.Provider>
  );
};

const DataModule = ({ isEditable = true, value = 'default' }) => {
  const { isEditing } = useContext(ReusableModuleContext);

  const renderEditing = <Input defaultValue={value} />;

  const renderDisplay = (
    <div style={{ display: 'inline-block', padding: '.5em 1em' }}>{value}</div>
  );

  return isEditing ? renderEditing : renderDisplay;
};

const ActionModule = (props) => {
  // const { isEditing, isEditingAny } = useContext(ReusableModuleContext);

  return <Button content='ActionModule' />;
};

const ContextComposableActions = ({ data, dataConfig }) => {
  return (
    <div style={{ margin: '1em' }}>
      <div>
        <h1>ContextComposableActions POC</h1>
        <p>
          See ContextComposability for more simplified, data only examples about
          context composing patterns.
        </p>
      </div>

      <FormProvider>
        <DataModule value='Form' />
        <ActionModule />
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
        <RowProvider
          value={{
            // This overrides the value present at the parent
            type: 'parent',
          }}
        >
          <DataModule value='Row' />
        </RowProvider>
      </TableProvider>
    </div>
  );
};

const Fixture = <ContextComposableActions />;

export default Fixture;
