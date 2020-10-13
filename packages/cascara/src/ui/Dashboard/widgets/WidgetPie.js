import React from 'react';
import { ResponsivePie } from '@nivo/pie';
// import JsonPlaceholder from '../../../placeholders/JsonPlaceholder';
import styles from '../Dashboard.module.scss';

const WidgetPie = ({ data, title = 'WidgetPie' }) => {
  const CHART_CONFIG = {
    animate: true,
    borderColor: {
      from: 'color',
      modifiers: [['darker', 0.2]],
    },
    borderWidth: 1,
    innerRadius: 0.3,
    margin: {
      bottom: 32,
      left: 32,
      right: 32,
      top: 32,
    },
    motionDamping: 15,
    motionStiffness: 90,
    padAngle: 2,
    radialLabelsLinkColor: {
      from: 'color',
      modifiers: [['darker', 0.2]],
    },
    radialLabelsLinkDiagonalLength: 16,
    radialLabelsLinkHorizontalLength: 32,
    radialLabelsSkipAngle: 10,
    slicesLabelsSkipAngle: 10,
    slicesLabelsTextColor: {
      from: 'color',
      modifiers: [['darker', 0.2]],
    },
  };

  return (
    <div className={styles.Pie}>
      <h3 className={styles.Title}>{title}</h3>
      <div className={styles.Data} style={{ height: '400px' }}>
        <ResponsivePie {...CHART_CONFIG} data={data} />
      </div>
      {/* <JsonPlaceholder data={data} title='WidgetPie' /> */}
    </div>
  );
};

export default WidgetPie;
