import React from 'react';
import pt from 'prop-types';
import { Role } from 'reakit/Role';
import Boundaries from '../../system-components/Boundaries';
import classnames from 'classnames/bind';

import styles from './Dashboard.module.scss';

import WidgetBar from './widgets/WidgetBar';
import WidgetBubble from './widgets/WidgetBubble';
import WidgetGeoMap from './widgets/WidgetGeoMap';
import WidgetHeatMap from './widgets/WidgetHeatMap';
import WidgetLine from './widgets/WidgetLine';
import WidgetList from './widgets/WidgetList';
import WidgetPie from './widgets/WidgetPie';
import WidgetStats from './widgets/WidgetStats';
// import WidgetTreeMap from './widgets/WidgetTreeMap';

import WidgetError from './widgets/WidgetError';

const WIDGETS = {
  bar: WidgetBar,
  bubble: WidgetBubble,
  'geo-map': WidgetGeoMap,
  'heat-map': WidgetHeatMap,
  line: WidgetLine,
  list: WidgetList,
  pie: WidgetPie,
  stats: WidgetStats,
  // 'tree-map': WidgetTreeMap,
};

const widgetKeys = Object.keys(WIDGETS);

const propTypes = {
  as: pt.string,
  className: pt.string,
  /** Configuration of all widgets for a dashboard */
  config: pt.arrayOf(
    pt.shape({
      widget: pt.oneOf(widgetKeys).isRequired,
    })
  ).isRequired,
};

const cx = classnames.bind(styles);

// add proptype
const Dashboard = ({ as = 'div', config, className, ...props }) => {
  const renderWidget = ({ widget, ...rest }, index) => {
    const key = rest?.title + widget || index;
    const Component = WIDGETS[widget];

    return Component ? (
      <Component {...rest} key={key} />
    ) : (
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
              {widgetKeys.map((key, i) => (
                <>
                  <code key={key}>{key}</code>
                  {widgetKeys.length > i + 1 && ', '}
                </>
              ))}
            </p>
          </>
        }
      />
    );
  };

  return (
    <Boundaries>
      <Role {...props} as={as} className={cx(className, 'Dashboard')}>
        {config ? (
          config.map((widget) => renderWidget(widget))
        ) : (
          <em>No config defined.</em>
        )}
      </Role>
    </Boundaries>
  );
};

Dashboard.propTypes = propTypes;

export default Dashboard;
