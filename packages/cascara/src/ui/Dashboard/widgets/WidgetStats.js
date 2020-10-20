import React from 'react';
import { Clickable } from 'reakit';
import Widget, { propTypes as widgetPT } from './Widget';
import styles from '../Dashboard.module.scss';

const propTypes = {
  ...widgetPT,
};

const WidgetStats = ({ data, ...rest }) => (
  <Widget {...rest} className={styles.Stats} height='auto'>
    {data?.map((stat) => (
      <Clickable
        as='div'
        className={styles.Stat}
        disabled={!Boolean(stat?.onClick)}
        focusable={Boolean(stat?.onClick)}
        key={stat.label}
        onClick={stat?.onClick}
      >
        <span className={styles.Value}>{stat.value}</span>
        <h4 className={styles.Label}>{stat.label}</h4>
        {styles?.Sub && <span className={styles.Sub}>{stat.sub}</span>}
      </Clickable>
    ))}
  </Widget>
);

WidgetStats.propTypes = propTypes;
WidgetStats.displayName = 'widget: stats';

export { propTypes };

export default WidgetStats;
