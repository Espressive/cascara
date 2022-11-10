import React from 'react';
import widgetListFixtures from './Dashboard_ListWidget.fixture';
import Dashboard from './Dashboard';
import pieData from './tests/data/Pie';
import geoMapData from './tests/data/GeoMap';
import barData from './tests/data/Bar';

const statsData = [
  {
    label: 'Total Interactions',
    onClick: () => alert('hi'),
    value: '12,535',
  },
  {
    label: 'Unique Users',
    value: '1,205',
  },
  {
    label: 'On Mobile',
    sub: 'Interactions via Barista Channel',
    value: '58%',
  },
];

const WIDGET_DATA = {
  bar: barData,
  bubble: geoMapData,
  'geo-map': geoMapData,
  list: barData,
  pie: pieData,
  stats: statsData,
};

// Widgets here are defined in alphabetical order except for the duplicate Stats widget we are defining at top
const WIDGETS = [
  {
    actions: [
      {
        content: 'view',
      },
    ],
    description:
      'Your most frequently matched intents in the time period selected.',
    title: 'w/ Actions & Description',
    widget: 'stats',
  },
  {
    axisBottomLabel: 'Month',
    axisLeftLabel: 'Requests',
    data: null,
    indexBy: 'month',
    keys: ['helpful', 'not helpful', 'no data'],
    title: 'Bar',
    widget: 'bar',
  },
  {
    data: null,
    title: 'Bubble',
    widget: 'bubble',
  },
  {
    title: 'Geo Map',
    widget: 'geo-map',
  },
  {
    data: undefined,
    // keys: ['country', 'fries', 'curry'],
    // rowAction: (obj) => console.log(obj), // Without a rowAction defined, no row action will show. Note that the function gets the original object passed to it.
    title: 'List (simple)',
    widget: 'list',
  },
  {
    data: undefined,
    keys: ['not helpful', 'no data', 'helpful', 'month'],
    rowAction: (obj) => console.log(obj), // Without a rowAction defined, no row action will show. Note that the function gets the original object passed to it.
    footer: {
      data: {
        'not helpful': {
          value: 1,
        },
        'no data': {
          value: 1,
        },
        helpful: {
          value: 1,
        },
      },
    },
    title: 'List with Actions and footer',
    widget: 'list',
  },
  {
    enableRadialLabels: false,
    title: 'Pie',
    widget: 'pie',
  },
  {
    data: undefined,
    title: 'Stats',
    widget: 'stats',
  },
];

// Adds an empty array to data for all widgets in dashboard
const EMPTY_WIDGETS = WIDGETS.map((obj) => ({ ...obj, data: [] }));

// Adds data to the widgets to render
const DATA_WIDGETS = WIDGETS.map((obj) => ({
  ...obj,
  data: WIDGET_DATA?.[obj.widget] || [],
}));

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

const WithData = (fixtureProps) => (
  <>
    <h3>With Data</h3>
    <p>
      When adding data to all widgets to display, we want to validate none of
      the above fixtures broke anything.
    </p>

    <Dashboard {...fixtureProps} />
  </>
);

export default {
  noProps: <NoProps />,
  loading: <Loading config={WIDGETS} />,
  empty: <Empty config={EMPTY_WIDGETS} />,
  withData: <WithData config={DATA_WIDGETS} />,
  widgetListFixtures,
};
