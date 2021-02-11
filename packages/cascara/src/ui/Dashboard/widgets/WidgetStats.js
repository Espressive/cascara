import React from 'react';
import pt from 'prop-types';
import Widget, { propTypes as widgetPT } from './Widget';
import Stat from './WidgetStatsStat';
import styles from '../Dashboard.module.scss';

const propTypes = {
  ...widgetPT,
  /** Data to display in a widget */
  data: pt.oneOfType([pt.array, pt.object]).isRequired,
};

/**
 * Widget for displaying stats
 */
const WidgetStats = ({ data, ...rest }) => {
  return (
    <Widget {...rest} className={styles.Stats} height='auto'>
      {data?.map((stat) => (
        <Stat {...stat} key={stat.label} />
      ))}
    </Widget>
  );
};

WidgetStats.propTypes = propTypes;
WidgetStats.displayName = 'stats';

export { propTypes };

export default WidgetStats;
