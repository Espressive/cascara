import React from 'react';
import pt from 'prop-types';

import styles from './Dashboard.module.scss';

import WidgetBar from './widgets/WidgetBar';
import WidgetGeoMap from './widgets/WidgetGeoMap';
import WidgetHeatMap from './widgets/WidgetHeatMap';
import WidgetLine from './widgets/WidgetLine';
import WidgetPie from './widgets/WidgetPie';
import WidgetStats from './widgets/WidgetStats';
// import WidgetTreeMap from './widgets/WidgetTreeMap';

import WidgetError from './widgets/WidgetError';

const WIDGET_KEYS = {
  bar: 'bar',
  geoMap: 'geo-map',
  heatMap: 'heat-map',
  line: 'line',
  pie: 'pie',
  stats: 'stats',
  // treeMap: 'tree-map',
};

const keyValues = Object.values(WIDGET_KEYS);

const propTypes = {
  /** Configuration of all widgets for a dashboard */
  config: pt.arrayOf(
    pt.shape({
      widget: pt.oneOf(keyValues).isRequired,
    })
  ).isRequired,
};

const Dashboard = ({ config }) => {
  const renderWidget = ({ widget, ...rest }, index) => {
    const key = rest?.title + widget || index;
    switch (widget) {
      case WIDGET_KEYS.bar:
        return <WidgetBar {...rest} key={key} />;
      case WIDGET_KEYS.geoMap:
        return <WidgetGeoMap {...rest} key={key} />;
      case WIDGET_KEYS.heatMap:
        return <WidgetHeatMap {...rest} key={key} />;
      case WIDGET_KEYS.line:
        return <WidgetLine {...rest} key={key} />;
      case WIDGET_KEYS.pie:
        return <WidgetPie {...rest} key={key} />;
      case WIDGET_KEYS.stats:
        return <WidgetStats {...rest} key={key} />;
      // case WIDGET_KEYS.treeMap:
      //   return <WidgetTreeMap {...rest} key={key} />;
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
                  Try:{' '}
                  {keyValues.map((key, i) => (
                    <>
                      <code key={key}>{key}</code>
                      {keyValues.length > i + 1 && ', '}
                    </>
                  ))}
                </p>
              </>
            }
          />
        );
    }
  };

  return (
    <div className={styles.Dashboard}>
      {config.map((widget) => renderWidget(widget))}
    </div>
  );
};

Dashboard.propTypes = propTypes;

export default Dashboard;
