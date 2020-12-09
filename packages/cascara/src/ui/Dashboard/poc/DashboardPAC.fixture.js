/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Container } from 'semantic-ui-react';
import Dashboard from '../Dashboard';
import pieData from '../data/Pie';
import pieData2 from '../data/Pie2';
import pieDataChannel from '../data/PieChannel';
import geoMapData from '../data/GeoMap';
import barData from '../data/Bar';
import barData2 from '../data/Bar2';
import barDataDevice from '../data/BarDevice';

const dataInteractions = [
  {
    label: 'Total Interactions',
    value: '12,535',
  },
  {
    label: 'Unique Users',
    value: '1,205',
  },
  {
    label: 'On Mobile',
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
    data: barData2,
    indexBy: 'month',
    keys: ['Deflected', 'Not Deflected'],
    title: 'Deflected VS Not Deflected',
    widget: 'bar',
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
    indexBy: 'OS',
    keys: ['Safari', 'Chrome', 'Native App', 'Edge', 'Other'],
    layout: 'horizontal',
    title: 'OS/Browser/Application',
    widget: 'bar',
  },
];

const DashboardPAC = () => {
  return (
    <Container as='main' style={{ padding: '2em 0' }}>
      <Dashboard config={dashboardConfig} />
    </Container>
  );
};

const Fixture = <DashboardPAC />;

export default Fixture;
