import React from 'react';
import JsonPlaceholder from '../../../placeholders/JsonPlaceholder';
import styles from '../Dashboard.module.scss';

const WidgetPie = ({ data, title = 'WidgetPie' }) => (
  <div className={styles.Pie}>
    <h3 className={styles.Title}>{title}</h3>
    <div className={styles.Data}>
      <JsonPlaceholder data={data} title='WidgetPie' />
    </div>
  </div>
);

export default WidgetPie;
