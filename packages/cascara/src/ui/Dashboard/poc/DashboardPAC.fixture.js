/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Container, Select } from 'semantic-ui-react';
import Dashboard from '../Dashboard';

const foodData = [
  {
    burger: 52,
    country: 'AD',
    donut: 119,
    fries: 188,
    'hot dog': 110,
    kebab: 192,
    sandwich: 93,
  },
  {
    burger: 198,
    country: 'AE',
    donut: 41,
    fries: 16,
    'hot dog': 77,
    kebab: 177,
    sandwich: 2,
  },
  {
    burger: 120,
    country: 'AF',
    donut: 147,
    fries: 192,
    'hot dog': 108,
    kebab: 112,
    sandwich: 148,
  },
  {
    burger: 173,
    country: 'AG',
    donut: 75,
    fries: 162,
    'hot dog': 69,
    kebab: 65,
    sandwich: 121,
  },
  {
    burger: 100,
    country: 'AI',
    donut: 53,
    fries: 80,
    'hot dog': 119,
    kebab: 164,
    sandwich: 114,
  },
  {
    burger: 162,
    country: 'AL',
    donut: 183,
    fries: 185,
    'hot dog': 163,
    kebab: 108,
    sandwich: 200,
  },
  {
    burger: 165,
    country: 'AM',
    donut: 174,
    fries: 192,
    'hot dog': 134,
    kebab: 161,
    sandwich: 159,
  },
];

const mapData = [
  {
    id: 'AUS',
    value: 5,
  },
  {
    id: 'FRA',
    value: 30,
  },
  {
    id: 'RUS',
    value: 15,
  },
  {
    id: 'IND',
    value: 40,
  },
  {
    id: 'USA',
    value: 50,
  },
];

const dashboardConfig = [
  {
    data: [
      {
        label: 'Deflections',
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
    axisBottomLabel: 'Country',
    axisLeftLabel: 'Food',
    data: foodData,
    indexBy: 'country',
    keys: ['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut'],
    title: 'Sweet Bars',
    widget: 'bar',
  },
  {
    data: mapData,
    title: 'Cool Map',
    widget: 'geo-map',
  },
  {
    title: 'Some Slices',
    widget: 'pie',
  },
  {
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
        label: 'Widgets for POC',
        value: 5,
      },
    ],
    title: 'Other Stats',
    widget: 'stats',
  },
  {
    title: 'Hot Widget',
    widget: 'pie',
  },
  {
    title: 'Trees!',
    widget: 'tree-map',
  },
];

const DashboardPAC = () => {
  return (
    <Container as='main' style={{ padding: '2em 0' }}>
      <Select />
      <Dashboard config={dashboardConfig} />
    </Container>
  );
};

const Fixture = <DashboardPAC />;

export default Fixture;
