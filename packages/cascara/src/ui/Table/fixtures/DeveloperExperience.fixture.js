import React, { useCallback } from 'react';
import { Provider } from 'reakit';

import Table from '../Table';
import { results } from '../data/entities';

import { ACTIONS, COLUMNS } from './constants';

const DataWithDisplay = (fixtureProps) => (
  <>
    <h3>
      Data With <code>dataDisplay</code>
    </h3>
    <p>
      Developers should be able to pass a minimal dataDisplay config to narrow
      the fields that they want to show in the Table. There should be no need
      for setting up dependant props for this to work.
    </p>
    <div style={{ columnCount: 2 }}>
      <p>
        No unique identifier is being set so we are inferring it based on data
        keys in this order:
      </p>
      <ol>
        <li>eid</li>
        <li>uuid</li>
        <li>id</li>
        <li>sys_date_created</li>
      </ol>
      <p>These are the only columns that should be showing:</p>
      <ul>
        {COLUMNS.map(({ label }) => (
          <li key={label}>{label}</li>
        ))}
      </ul>
    </div>

    <Provider>
      <Table {...fixtureProps} />
    </Provider>
  </>
);

const UnknownActionModules = (fixtureProps) => (
  <>
    <h3>
      actions.modules with <code>unknown modules</code>
    </h3>
    <p>
      A helpful error message is displayed if an action module is not found.
    </p>

    <Provider>
      <Table {...fixtureProps} />
    </Provider>
  </>
);

const UnknownDataModules = (fixtureProps) => (
  <>
    <h3>
      dataDisplay with <code>unknown modules</code>
    </h3>
    <p>A helpful error message is displayed if a data module is not found.</p>

    <Provider>
      <Table {...fixtureProps} />
    </Provider>
  </>
);

const WithDeprecatedProps = ({ onAction: extOnAction, ...props } = {}) => {
  const onAction = useCallback((action, record) => {
    console.log(`Action ${action.name} invoked`);

    switch (action.name) {
      case 'viewInFAQ':
        console.table(record);
        break;

      case 'edit.start':
        // do something
        break;

      case 'edit.cancel':
        // do something
        break;

      case 'edit.save':
        // do something
        break;

      default:
        break;
    }
  }, []);

  return (
    <>
      <h3>With deprecated props</h3>
      <p>
        Some props have been deprecated, this is a safeguard for developerss
      </p>

      <Provider>
        <Table {...props} onAction={extOnAction || onAction} />
      </Provider>
    </>
  );
};

// We export the data results here for use in our tests.
// This also allows us to generate test data from inside a fixture and then reuse it in tests.
const dataResults = results;
export { dataResults };

export default {
  dataWithDisplay: (
    <DataWithDisplay
      data={results}
      dataDisplay={COLUMNS}
      uniqueIdAttribute='eid'
    />
  ),
  unknownActionModule: (
    <UnknownActionModules
      actions={{
        ...ACTIONS,
        modules: [
          ...ACTIONS.modules,
          {
            module: 'tequila',
          },
        ],
      }}
      data={results}
      dataDisplay={COLUMNS}
    />
  ),
  unknownDataModule: (
    <UnknownDataModules
      actions={ACTIONS}
      data={results}
      dataDisplay={[...COLUMNS, { attribute: 'eid', module: 'unknownModule' }]}
      uniqueIdAttribute='eid'
    />
  ),
  withDeprecatedProps: (
    <WithDeprecatedProps
      data={results}
      dataConfig={{
        actions: ACTIONS.modules,
        display: COLUMNS,
      }}
      uniqueIdAttribute='eid'
    />
  ),
};
