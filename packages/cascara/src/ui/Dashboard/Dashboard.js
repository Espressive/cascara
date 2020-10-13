import React from 'react';
import styles from './Dashboard.module.scss';

import WidgetBar from './widgets/WidgetBar';
import WidgetGeoMap from './widgets/WidgetGeoMap';
import WidgetHeatMap from './widgets/WidgetHeatMap';
import WidgetPie from './widgets/WidgetPie';
import WidgetStats from './widgets/WidgetStats';
import WidgetTreeMap from './widgets/WidgetTreeMap';

import WidgetError from './widgets/WidgetError';

const renderWidget = ({ widget, ...rest }) => {
  switch (widget) {
    case 'bar':
      return <WidgetBar {...rest} />;
    case 'geo-map':
      return <WidgetGeoMap {...rest} />;
    case 'heat-map':
      return <WidgetHeatMap {...rest} />;
    case 'pie':
      return <WidgetPie {...rest} />;
    case 'stats':
      return <WidgetStats {...rest} />;
    case 'tree-map':
      return <WidgetTreeMap {...rest} />;
    default:
      return (
        <WidgetError
          message={
            <>
              <p>
                <code>{widget}</code> is not a valid value for{' '}
                <code>widget</code>.
              </p>{' '}
              <p>
                Try: 'bar', 'geo-map', 'heat-map', 'pie', 'stats', 'tree-map'
              </p>
            </>
          }
        />
      );
  }
};

const Dashboard = ({ children, config }) => (
  <div className={styles.Dashboard}>
    {config.map((widget) => renderWidget(widget))}
  </div>
);

export default Dashboard;
