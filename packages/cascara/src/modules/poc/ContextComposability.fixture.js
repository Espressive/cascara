/* eslint-disable react/no-multi-comp */
import React, { useContext } from 'react';
import JsonPlaceholder from '../../placeholders/JsonPlaceholder';
import ReusableModuleContext, { defaultValue } from './ReusableModuleContext';

// Here is a custom provider that can exist alone, or it can also exist with a parent context.
// The magic for each use case can exist with how we define these providers and what we need them to do
const ReusableProvider = ({ children, value, ...props }) => {
  // Consuming the next context up inside the provider works because we will probably not be
  // in a situation where a component tree will have one complex Module based structure inside
  // of another. If that DOES happen to be a need, we could simply make a "great grandparent"
  // context that was an empty insulator which does not have any of the special functionality
  // below... it would essentially mute anything else from coming in from upstream Module contexts.
  const grandparentValues = useContext(ReusableModuleContext);

  // 1. Defaults must be spread first so we can override with values passed
  // 2. This pattern can be used to make sure we always have props present for things a Module might need
  // 3. The same reusable context can now also be used to compose a special provider that does this on a case by case basis
  const mergedValues = {
    ...defaultValue,
    ...grandparentValues,
    ...value,
  };
  return (
    <ReusableModuleContext.Provider value={mergedValues} {...props}>
      <div
        // We PROBABLY do not want to put any markup inside of context providers... this is just
        // to illustrate where a context exists
        style={{
          border: '1px dotted red',
          margin: '1em 0',
          padding: '1em',
        }}
      >
        {children}
      </div>
    </ReusableModuleContext.Provider>
  );
};

// Our modules can always be looking for the closest provider for what they need.
// Because the provider itself has its own logic on how it decides to do special
// things with that context, the Modules to not need to reference a different
// context for all scenarios when we reach for useContext()
const ReusableModule = (props) => {
  const contextValues = useContext(ReusableModuleContext);

  return (
    <div>
      <JsonPlaceholder {...props} data={contextValues} />
    </div>
  );
};

const ContextComposability = ({ data, dataConfig }) => {
  return (
    <div style={{ margin: '1em' }}>
      <div>
        <h1>ContextComposability POC</h1>
        <p>
          We need to be able to use the same context in ANY component that needs
          a Data Module or Action Module in order for these modules to be
          reusable. This fixture attempts to explore patterns on React Context
          composability.
        </p>
        <ul>
          <li>Can we use the same context for all Modules?</li>
          <li>
            Can we compose contexts so a child context can also access the
            context of a parent that comes from the same context type?
          </li>
          <li>
            What sorts of patterns and best practices should we follow for
            semantics and clarity?
          </li>
          <li>Is this even possible with React Context?</li>
        </ul>
      </div>
      <ReusableModule title='Default, no parent context' />
      <ReusableProvider
        value={{
          // This overrides the default value we are merging from the provider
          isEditing: true,
          // This value is not in the defaults
          type: 'parent',
        }}
      >
        <ReusableModule isInitialOpen title='With a parent context' />
      </ReusableProvider>

      <ReusableProvider
        value={{
          // This unique value will get added to the provider below
          fromGrandparent: 'hello',
          // The type will get overridden in the provider below
          type: 'grandparent',
        }}
      >
        <ReusableModule isInitialOpen title='Reading from grandparent' />
        <ReusableProvider
          value={{
            // This overrides the value present at the parent
            type: 'parent',
          }}
        >
          <ReusableModule
            isInitialOpen
            title='With a parent, grandparent context'
          />
        </ReusableProvider>
      </ReusableProvider>

      <ReusableProvider
        value={{
          // these values should not show up inside of the contexts below
          fromGlobal: 'hello',
          type: 'global',
        }}
      >
        {/* This provider is being used with no value to insulate from inheriting from a great grandparent context or global context, in case we ever happen to encounter that problem */}
        <ReusableModuleContext.Provider>
          <div
            // We PROBABLY do not want to put any markup inside of context providers... this is just
            // to illustrate where a context exists
            style={{
              border: '2px dotted blue',
              margin: '1em 0',
              padding: '1em',
            }}
          >
            <p>
              There is another parent wrapping here which has no values. The
              data below SHOULD be empty if things are working correctly because
              the parent context is empty. This pattern could be used to
              insulate contexts that might be reading from our reusable context
              provider in a way we do not want.
            </p>
            <ReusableModule
              isInitialOpen
              title='Reading from empty parent context with empty values'
            />
            <ReusableProvider
              value={{
                // This overrides the value present at the parent
                type: 'parent',
              }}
            >
              <ReusableModule
                isInitialOpen
                title='With a parent, grandparent context'
              />
            </ReusableProvider>
          </div>
        </ReusableModuleContext.Provider>
      </ReusableProvider>
    </div>
  );
};

const Fixture = <ContextComposability />;

export default Fixture;
