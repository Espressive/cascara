/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Container } from 'semantic-ui-react';
import Dashboard from '../Dashboard';
import lineData from '../data/Line';
import pieData from '../data/Pie';
import geoMapData from '../data/GeoMap';
import barData from '../data/Bar';
import heatMapData from '../data/HeatMap';
import treeMapData from '../data/TreeMap';

const dashboardConfig = [
  {
    data: [
      {
        label: 'Deflections',
        onClick: () => alert('hello'),
        value: 12535,
      },
      {
        label: 'Incidents / 30 Days',
        value: 124,
      },
      {
        label: 'Metric',
        value: '234 cars',
      },
      {
        label: 'New Smurfs',
        value: '15',
      },
      {
        label: 'Favorites',
        value: 11,
      },
    ],
    title: 'Our Stats Widget',
    widget: 'stats',
  },
  {
    actions: [
      {
        content: 'View',
        module: 'button',
        onClick: () => alert('hello'),
      },
    ],
    axisBottomLabel: 'Country',
    axisLeftLabel: 'Food',
    data: barData,
    description:
      'Interactions are anything where a users has had actual interactions (not chit-chat) that resulted in an intent being triggered.',
    indexBy: 'country',
    keys: ['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut'],
    title: 'Interactions (Last 30 Days)',
    widget: 'bar',
  },
  {
    actions: [
      {
        content: 'View',
        module: 'button',
        onClick: () => alert('MAPS!!!!'),
      },
    ],
    data: geoMapData,
    title: 'Cool Map',
    widget: 'geo-map',
  },
  {
    data: pieData,
    description: 'Have a pie',
    title: 'Some Slices',
    widget: 'pie',
  },
  {
    axisBottomLabel: 'Transportation',
    axisLeftLabel: 'Count',
    data: lineData,
    title: 'Lines',
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
  {
    data: [
      {
        label: 'Best Team',
        value: 'Arsenal',
      },
      {
        label: 'Aubameyang',
        value: '386 goals',
      },
    ],
    description: 'Gooners!',
    title: 'Other Stats',
    widget: 'stats',
  },
  {
    data: heatMapData,
    description: 'If you want to do some stuff, you can do it here.',
    indexBy: 'country',
    title: 'Hot Widget',
    widget: 'heat-map',
  },
  {
    actions: [
      {
        content: 'View',
        module: 'button',
        onClick: () => alert('hey'),
      },
    ],
    data: treeMapData,
    description: 'Honestly not real sure how useful this thing is as of now',
    indexBy: 'name',
    title: 'Trees!',
    widget: 'tree-map',
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
