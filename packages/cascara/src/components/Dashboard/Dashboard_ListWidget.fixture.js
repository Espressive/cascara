import React from 'react';
import Dashboard from './Dashboard';
import heatMapData from './tests/data/HeatMap';

const simpleListConfig = [
  {
    data: heatMapData,
    keys: ['country', 'fries', 'curry'], // Without keys defined, all data from each object will show
    // rowAction: (obj) => console.log(obj), // Without a rowAction defined, no row action will show. Note that the function gets the original object passed to it.
    title: 'List',
    widget: 'list',
  },
];

const widgetListWithStickyFooter = [
  // Fixture for a list with sticky footer
  {
    // if no footer prop is defined in the dashboard config object for lists then no footer will be shown
    footer: {
      // OPTIONAL settings: If exists property hidden then the footer will dissapear. If not, because the property footer exists this one will be sticky at the bottom of the table
      // settings: {
      //   hidden: true
      // },
      // Data to display at the footer of the table. The keys of data should match in name with the keys of the table columns. We will match the data keys from below with the corresponding column.
      data: {
        fries: {
          value: heatMapData.reduce((total, obj) => obj['fries'] + total, 0),
        },
        curry: {
          value: heatMapData.reduce((total, obj) => obj['curry'] + total, 0),
        },
      },
    },
    data: heatMapData,
    keys: ['country', 'fries', 'curry'], // Without keys defined, all data from each object will show
    // rowAction: (obj) => console.log(obj), // Without a rowAction defined, no row action will show. Note that the function gets the original object passed to it.
    title: 'List Sticky Footer',
    widget: 'list',
  },
];

const widgetListWithStickyFooterAndHeader = [
  // Fixture for a list with sticky footer and header
  {
    // if no footer prop is defined in the dashboard config object for lists then no footer will be shown
    footer: {
      // settings prop (OPTIONAL): If exists property hidden then the footer will dissapear. If not, because the property footer exists this one will be sticky at the bottom of the table
      // settings: {
      //   hidden: true
      // },
      // Data prop (REQUIRED): data to display at the footer of the table.
      // The keys of data should match in name with the keys of the table columns.
      // We will match the data keys from below with the corresponding column.
      data: {
        fries: {
          value: heatMapData.reduce((total, obj) => obj['fries'] + total, 0),
        },
        curry: {
          value: heatMapData.reduce((total, obj) => obj['curry'] + total, 0),
        },
        junk: {
          value: `a footer string`,
        },
      },
    },
    // HEADER SETTINGS (Optional) set the header as sticky at the top of the table
    header: {
      settings: {
        sticky: true,
      },
    },
    data: heatMapData,
    keys: ['country', 'fries', 'curry', 'junk'], // Without keys defined, all data from each object will show
    // rowAction: (obj) => console.log(obj), // Without a rowAction defined, no row action will show. Note that the function gets the original object passed to it.
    title: 'List Sticky Footer and header',
    widget: 'list',
  },
];

const SimpleListWidget = ({ dashboardConfig }) => {
  return (
    <main style={{ padding: '2em' }}>
      <Dashboard config={dashboardConfig} />
    </main>
  );
};
const StickyFooterListWidget = () => {
  return (
    <main style={{ padding: '2em' }}>
      <Dashboard config={widgetListWithStickyFooter} />
    </main>
  );
};
const StickyFooterHeaderListWidget = () => {
  return (
    <main style={{ padding: '2em' }}>
      <Dashboard config={widgetListWithStickyFooterAndHeader} />
    </main>
  );
};

export default {
  'Simple List Widget': <SimpleListWidget dashboardConfig={simpleListConfig} />,
  'Sticky Footer List Widget': (
    <StickyFooterListWidget dashboardConfig={widgetListWithStickyFooter} />
  ),
  'Sticky Footer And Header List Widget': (
    <StickyFooterHeaderListWidget
      dashboardConfig={widgetListWithStickyFooterAndHeader}
    />
  ),
};
