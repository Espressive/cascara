import React from 'react';
import Dashboard from './Dashboard';

const WIDGETS = [
  {
    data: undefined,
    keys: ['country', 'fries', 'curry'], // Without keys defined, all data from each object will show
    // rowAction: (obj) => console.log(obj), // Without a rowAction defined, no row action will show. Note that the function gets the original object passed to it.
    title: 'List',
    widget: 'list',
  },
  {
    data: null,
    indexBy: 'id', // 'id' is the default and not needed if the data already matches
    label: 'value', // 'value' is the default and is not needed if the data already matches
    title: 'Bubble',
    widget: 'bubble',
  },
  {
    actions: [
      {
        content: 'view',
      },
    ],
    title: 'Interactions',
    widget: 'stats',
  },
  {
    data: undefined,
    title: 'Deflections',
    widget: 'stats',
  },
  {
    axisBottomLabel: 'Month',
    axisLeftLabel: 'Requests',
    data: null,
    description:
      'Shows number of requests and how your users have rated their experience over time',
    indexBy: 'month',
    keys: ['helpful', 'not helpful', 'no data'],
    title: 'User Feedback',
    widget: 'bar',
  },
  {
    title: 'Interactions by Country',
    widget: 'geo-map',
  },
  {
    axisLeft: null,
    description:
      'Questions that your users are asking that correspond to non-configured FAQ articles.',
    indexBy: 'label',
    layout: 'horizontal',
    title: 'Top 10 Unanswered Questions',
    widget: 'bar',
  },
  {
    description:
      'Your most frequently matched intents in the time period selected.',
    enableRadialLabels: false,
    title: 'Top Matched Intents',
    widget: 'pie',
  },
  {
    axisBottomLabel: 'Month',
    axisLeftLabel: 'Count',
    indexBy: 'month',
    keys: ['Deflected', 'Not Deflected'],
    title: 'Deflected VS Not Deflected',
    widget: 'bar',
  },
  {
    enableRadialLabels: false,
    title: 'Channels',
    widget: 'pie',
  },
  {
    axisBottomLabel: 'Requests',
    axisLeftLabel: 'Operating System',
    description:
      'Breakdown of interactions via Barista channel by operating system and client',
    indexBy: 'OS',
    keys: ['Safari', 'Chrome', 'Native App', 'Edge', 'Other'],
    layout: 'horizontal',
    title: 'Barista Channel Interactions by OS/Client',
    widget: 'bar',
  },
];

const EMPTY_WIDGETS = WIDGETS.map((obj) => ({ ...obj, data: [] }));

const NoProps = (fixtureProps) => (
  <>
    <h3>No Props</h3>
    <p>
      Even though it is required, we should not blow up when there is no{' '}
      <code>data</code> prop defined.
    </p>

    <Dashboard {...fixtureProps} />
  </>
);

const Loading = (fixtureProps) => (
  <>
    <h3>Loading</h3>
    <p>
      When a widget has an undefined or null value for <code>data</code> it
      should show a loading state.
    </p>

    <Dashboard {...fixtureProps} />
  </>
);

const Empty = (fixtureProps) => (
  <>
    <h3>Empty</h3>
    <p>
      When a widget has an empty array value for <code>data</code> (data.length
      === 0) it should show an empty state.
    </p>

    <Dashboard {...fixtureProps} />
  </>
);

// We export the data results here for use in our tests.
// This also allows us to generate test data from inside a fixture and then reuse it in tests.
// const dataResults = results;
// export { dataResults };

/* eslint-disable sort-keys -- We want these to show in a specific order in the UI */
export default {
  noProps: <NoProps />,
  loading: <Loading config={WIDGETS} />,
  empty: <Empty config={EMPTY_WIDGETS} />,
};
/* eslint-enable sort-keys */
