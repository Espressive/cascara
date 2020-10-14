import React from 'react';
import { ResponsiveBarCanvas } from '@nivo/bar';
import Widget from './Widget';

const WidgetBar = ({
  axisLeftLabel,
  axisBottomLabel,
  data,
  indexBy = 'id',
  keys,
  ...rest
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
    borderColor: {
      from: 'color',
      modifiers: [['darker', 0.2]],
    },
    borderWidth: 1,
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
    <Widget {...rest}>
      <ResponsiveBarCanvas
        {...CHART_CONFIG}
        data={data}
        indexBy={indexBy}
        keys={keys}
      />
    </Widget>
  );
};

export default WidgetBar;
