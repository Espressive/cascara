import React from 'react';
import JsonPlaceholder from '../../../placeholders/JsonPlaceholder';
import styles from '../Dashboard.module.scss';

const WidgetLine = ({ data, title = 'WidgetLine' }) => (
  <div className={styles.Line}>
    <h3 className={styles.Title}>{title}</h3>
    <div className={styles.Data}>
      <JsonPlaceholder data={data} title='WidgetLine' />
    </div>
  </div>
);

export default WidgetLine;
