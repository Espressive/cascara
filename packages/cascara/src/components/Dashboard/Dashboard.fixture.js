import React from 'react';
import Dashboard from './Dashboard';
import pieData from './tests/data/Pie';
import pieData2 from './tests/data/Pie2';
import pieDataChannel from './tests/data/PieChannel';
import geoMapData from './tests/data/GeoMap';
import barData from './tests/data/Bar';
import barDataDevice from './tests/data/BarDevice';
import heatMapData from './tests/data/HeatMap';

const dataInteractions = [
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

const dataDeflections = [
  {
    label: 'Total Deflections',
    value: '7,235',
  },
  {
    label: 'Deflection Rate',
    value: '90%',
  },
  {
    label: 'Transferred to Agent',
    value: '67',
  },
  {
    label: 'Dollars Saved',
    sub: 'Est $20.00 per deflection',
    value: '$30,347',
  },
];

const dashboardConfig = [
  {
    data: heatMapData,
    keys: ['country', 'fries', 'curry'], // Without keys defined, all data from each object will show
    // rowAction: (obj) => console.log(obj), // Without a rowAction defined, no row action will show. Note that the function gets the original object passed to it.
    title: 'List',
    widget: 'list',
  },
  {
    data: geoMapData,
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
    data: dataInteractions,
    title: 'Interactions',
    widget: 'stats',
  },
  {
    data: dataDeflections,
    title: 'Deflections',
    widget: 'stats',
  },
  {
    axisBottomLabel: 'Month',
    axisLeftLabel: 'Requests',
    data: barData,
    description:
      'Shows number of requests and how your users have rated their experience over time',
    indexBy: 'month',
    keys: ['helpful', 'not helpful', 'no data'],
    title: 'User Feedback',
    widget: 'bar',
  },
  {
    data: geoMapData,
    title: 'Interactions by Country',
    widget: 'geo-map',
  },
  {
    axisLeft: null,
    data: pieData2,
    description:
      'Questions that your users are asking that correspond to non-configured FAQ articles.',
    indexBy: 'label',
    layout: 'horizontal',
    title: 'Top 10 Unanswered Questions',
    widget: 'bar',
  },
  {
    data: pieData,
    description:
      'Your most frequently matched intents in the time period selected.',
    enableRadialLabels: false,
    title: 'Top Matched Intents',
    widget: 'pie',
  },
  {
    axisBottomLabel: 'Month',
    axisLeftLabel: 'Count',
    data: [
      {
        data: [
          {
            x: '12/14',
            y: 43,
          },
        ],
        id: 'Deflected',
      },
      {
        data: [
          {
            x: '12/14',
            y: 19,
          },
        ],
        id: 'Not Deflected',
      },
      {
        data: [
          {
            x: '12/14',
            y: 3,
          },
        ],
        id: 'Empty',
      },
    ],
    indexBy: 'month',
    keys: ['Deflected', 'Not Deflected'],
    title: 'Deflected VS Not Deflected',
    widget: 'line',
  },
  {
    data: pieDataChannel,
    enableRadialLabels: false,
    title: 'Channels',
    widget: 'pie',
  },
  {
    axisBottomLabel: 'Requests',
    axisLeftLabel: 'Operating System',
    data: barDataDevice,
    description:
      'Breakdown of interactions via Barista channel by operating system and client',
    indexBy: 'OS',
    keys: ['Safari', 'Chrome', 'Native App', 'Edge', 'Other'],
    layout: 'horizontal',
    title: 'Barista Channel Interactions by OS/Client',
    widget: 'bar',
  },
];

const DashboardPAC = () => {
  return (
    <main style={{ padding: '2em' }}>
      <Dashboard config={dashboardConfig} />
    </main>
  );
};

const Fixture = <DashboardPAC />;

export default Fixture;
