/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Container } from 'semantic-ui-react';
import Dashboard from '../Dashboard';
import lineData from '../data/Line';
import pieData from '../data/Pie';
import pieData2 from '../data/Pie2';
import geoMapData from '../data/GeoMap';
import barData from '../data/Bar';

const dashboardConfig = [
  {
    data: [
      {
        label: 'Interactions',
        onClick: () => alert('We can do deep linking here!'),
        value: '12,535',
      },
      {
        label: 'Unique Users',
        value: '1,205',
      },
      {
        label: 'Total Deflections',
        value: '5,430',
      },
      {
        label: 'Deflection Rate',
        value: '90%',
      },
    ],
    title: 'Statistics',
    widget: 'stats',
  },
  {
    actions: [
      {
        content: 'View',
        module: 'button',
        onClick: () => alert('This takes us to a table with all of this data.'),
      },
    ],
    axisBottomLabel: 'Month',
    axisLeftLabel: 'Requests',
    data: barData,
    description:
      'Shows number of requests over time that have been rated by your users.',
    indexBy: 'month',
    keys: ['helpful', 'not helpful', 'no data'],
    title: 'User Feedback',
    widget: 'bar',
  },
  {
    actions: [
      {
        content: 'View',
        module: 'button',
        onClick: () => alert('ALL THE DATA'),
      },
    ],
    data: geoMapData,
    title: 'Interactions by Country',
    widget: 'geo-map',
  },
  {
    actions: [
      {
        content: 'View',
        module: 'button',
        onClick: () => alert('ALL THE DATA'),
      },
    ],
    data: pieData2,
    description:
      'Your most frequently matched intents in the time period selected.',
    title: 'Top Unanswered Questions',
    widget: 'pie',
  },
  {
    actions: [
      {
        content: 'View',
        module: 'button',
        onClick: () => alert('ALL THE DATA'),
      },
    ],
    data: pieData,
    description:
      'Your most frequently matched intents in the time period selected.',
    title: 'Top Matched Intents',
    widget: 'pie',
  },
  {
    axisBottomLabel: 'Month',
    axisLeftLabel: 'Count',
    data: lineData,
    title: 'Deflected VS Not Deflected',
    widget: 'line',
  },
  {
    actions: [
      {
        content: 'View',
        module: 'button',
        onClick: () => alert('oops'),
      },
    ],
    title: 'Bad Widget',
    widget: 'poop',
  },
];

const DashboardPAC = () => {
  return (
    <Container as='main' style={{ padding: '2em 0' }}>
      {/* <Select /> */}
      <Dashboard config={dashboardConfig} />
    </Container>
  );
};

const Fixture = <DashboardPAC />;

export default Fixture;
