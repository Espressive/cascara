import React from 'react';
import JsonPlaceholder from '../../../placeholders/JsonPlaceholder';
import styles from '../Dashboard.module.scss';

const WidgetTreeMap = ({ data, title = 'WidgetTreeMap' }) => (
  <div className={styles.TreeMap}>
    <h3 className={styles.Title}>{title}</h3>
    <div className={styles.Data}>
      <JsonPlaceholder data={data} title='WidgetTreeMap' />
    </div>
  </div>
);

export default WidgetTreeMap;
