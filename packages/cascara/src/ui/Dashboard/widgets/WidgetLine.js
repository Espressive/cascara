import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import Widget from './Widget';
import { AXIS_CONFIG } from './widgetConfig';

const WidgetLine = ({ axisBottomLabel, axisLeftLabel, data, ...rest }) => {
  const CHART_CONFIG = {
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
    margin: {
      bottom: axisBottomLabel ? 48 : 32,
      left: axisLeftLabel ? 60 : 48,
      right: 16,
      top: 32,
    },
    pointBorderColor: { from: 'serieColor' },
    pointBorderWidth: 2,
    pointColor: { theme: 'background' },
    useMesh: true,
    xScale: { type: 'point' },
    yScale: {
      stacked: true,
      type: 'linear',
    },
  };

  return (
    <Widget {...rest}>
      <ResponsiveLine {...CHART_CONFIG} data={data} />
    </Widget>
  );
};

export default WidgetLine;
