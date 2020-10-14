import React from 'react';
import { Clickable } from 'reakit';
import Widget from './Widget';
import styles from '../Dashboard.module.scss';

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
      </Clickable>
    ))}
  </Widget>
);

export default WidgetStats;
