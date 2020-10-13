import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
// import JsonPlaceholder from '../../../placeholders/JsonPlaceholder'
import styles from '../Dashboard.module.scss';

const WidgetBar = ({
  axisLeftLabel,
  axisBottomLabel,
  data,
  indexBy = 'id',
  keys,
  title = 'WidgetBar',
}) => {
  // TODO: Throw an error if no indexBy prop is set and there is no matching attribute in a data object

  // These configs are shared by the axis label config objects
  const AXIS_CONFIG = {
    legendPosition: 'middle',
    tickPadding: 5,
    tickRotation: 0,
    tickSize: 5,
  };

  const CHART_CONFIG = {
    animate: true,
    axisBottom: {
      ...AXIS_CONFIG,
      legend: axisBottomLabel,
      legendOffset: axisBottomLabel ? 32 : 0, // These and the margin calcs are still a little too "magic"
    },
    axisLeft: {
      ...AXIS_CONFIG,
      legend: axisLeftLabel,
      legendOffset: axisLeftLabel ? -40 : 0, // Also make this automatic with margins below
    },
    labelSkipHeight: 12,
    labelSkipWidth: 12,
    labelTextColor: {
      from: 'color',
      modifiers: [['darker', 2]],
    },
    margin: {
      bottom: axisBottomLabel ? 48 : 32,
      left: axisLeftLabel ? 60 : 48,
      right: 16,
      top: 32,
    },
    motionDamping: 15,
    motionStiffness: 90,
  };

  return (
    <div className={styles.Bar}>
      <h3 className={styles.Title}>{title}</h3>
      <div className={styles.Data} style={{ height: '400px' }}>
        <ResponsiveBar
          {...CHART_CONFIG}
          data={data}
          indexBy={indexBy}
          keys={keys}
        />
      </div>
      {/* <JsonPlaceholder data={data} title='WidgetBar' /> */}
    </div>
  );
};

export default WidgetBar;
