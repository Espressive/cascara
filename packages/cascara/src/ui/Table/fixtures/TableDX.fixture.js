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

const Loading = () => (
  <>
    <h3>Loading</h3>
    <p>
      The table component will not blow up if there are no values defined. It
      will also explicitly show a loading state if the data attribute is
      undefined (or null).
    </p>

    <Table />
  </>
);

const Empty = (fixtureProps) => (
  <>
    <h3>Empty</h3>
    <p>
      If a table gets an empty array, that should be treated different from
      undefined or null. An empty array should mean that there are no records
      and we should indicate this to users in the table itself.
    </p>

    <Table {...fixtureProps} />
  </>
);

const DataOnly = (fixtureProps) => (
  <>
    <h3>Data Only</h3>
    <p>
      When only passing an array of data results to a Table, we should render
      all results, even if no other props are defined yet. We should also
      attempt to infer the correct module type to display. This includes tricky
      types like object and array using a private module for JSON.
    </p>

    <Table {...fixtureProps} />
  </>
);

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

    <Table {...fixtureProps} />
  </>
);

// We export the data results here for use in our tests.
// This also allows us to generate test data from inside a fixture and then reuse it in tests.
const dataResults = results;
export { dataResults };

/* eslint-disable sort-keys -- We want these to show in a specific order in the UI */
export default {
  loading: <Loading />,
  empty: <Empty data={[]} />,
  dataOnly: <DataOnly data={results} />,
  dataWithDisplay: <DataWithDisplay data={results} dataDisplay={COLUMNS} />,
};
/* eslint-enable sort-keys */
