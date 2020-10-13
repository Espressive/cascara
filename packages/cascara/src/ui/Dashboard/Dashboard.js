import React from 'react';
import styles from './Dashboard.module.scss';

import WidgetBar from './widgets/WidgetBar';
import WidgetGeoMap from './widgets/WidgetGeoMap';
import WidgetHeatMap from './widgets/WidgetHeatMap';
import WidgetLine from './widgets/WidgetLine';
import WidgetPie from './widgets/WidgetPie';
import WidgetStats from './widgets/WidgetStats';
import WidgetTreeMap from './widgets/WidgetTreeMap';

import WidgetError from './widgets/WidgetError';

const renderWidget = ({ widget, ...rest }, index) => {
  const key = rest?.title + widget || index;
  switch (widget) {
    case 'bar':
      return <WidgetBar {...rest} key={key} />;
    case 'geo-map':
      return <WidgetGeoMap {...rest} key={key} />;
    case 'heat-map':
      return <WidgetHeatMap {...rest} key={key} />;
    case 'line':
      return <WidgetLine {...rest} key={key} />;
    case 'pie':
      return <WidgetPie {...rest} key={key} />;
    case 'stats':
      return <WidgetStats {...rest} key={key} />;
    case 'tree-map':
      return <WidgetTreeMap {...rest} key={key} />;
    default:
      return (
        // TODO: This should eventually become a message component for displaying helpful developer messages
        <WidgetError
          key={key}
          message={
            <>
              <p>
                <code>{widget}</code>
                {' is not a valid value for '}
                <code>widget</code>.
              </p>
              <p>
                Try: <code>bar</code>, <code>geo-map</code>,{' '}
                <code>heat-map</code>, <code>pie</code>, <code>stats</code>,{' '}
                <code>tree-map</code>
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
