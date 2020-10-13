import React from 'react';
import styles from '../Dashboard.module.scss';

const WidgetStats = ({ data, title = 'WidgetStats' }) => (
  <div className={styles.Stats}>
    <h3 className={styles.Title}>{title}</h3>
    <div className={styles.Data}>
      {data?.map((stat) => (
        <div className={styles.Stat} key={stat.label}>
          <span className={styles.Value}>{stat.value}</span>
          <h4 className={styles.Label}>{stat.label}</h4>
        </div>
      ))}
    </div>
  </div>
);

export default WidgetStats;
