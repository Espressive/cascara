import React from 'react';
import Table from '../Table';
import { results } from '../data/entities';

const COLUMNS = [
  {
    attribute: 'name',
    label: 'Name',
    module: 'text',
  },
  {
    attribute: 'description',
    label: 'Description',
    module: 'text',
  },
];

const Empty = () => (
  <>
    <h3>Empty</h3>
    <p>
      The table component should not blow up if no props at all are defined. It
      is likely we should have an empty state here. If nothing is defined at
      all, we could show a loading state. If we have an empty array of data, we
      should show an empty state. This will be consistent with what we are
      passing to a component.
    </p>

    <Table />
  </>
);

const DataOnly = () => (
  <>
    <h3>Data Only</h3>
    <p>
      When only passing an array of data results to a Table, we should render
      all results, even if no other props are defined yet. We should also
      attempt to infer the correct module type to display. This includes tricky
      types like object and array using a private module for JSON.
    </p>

    <Table data={results} />
  </>
);

const DataWithDisplay = () => (
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

    <Table data={results} dataDisplay={COLUMNS} />
  </>
);

// We export the data results here for use in our tests.
// This also allows us to generate test data from inside a fixture and then reuse it in tests.
export { results };

/* eslint-disable sort-keys -- We want these to show in a specific order in the UI */
export default {
  Empty: Empty,
  'Data Only': DataOnly,
  'Data w/ dataDisplay': DataWithDisplay,
};
/* eslint-enable sort-keys */
