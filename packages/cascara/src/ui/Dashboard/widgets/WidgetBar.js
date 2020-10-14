import React from 'react';
import { ResponsiveBarCanvas } from '@nivo/bar';
import Widget from './Widget';
import { AXIS_CONFIG, CHART_DEFAULTS } from './widgetConfig';

const WidgetBar = ({
  axisLeftLabel,
  axisBottomLabel,
  data,
  indexBy = 'id',
  keys,
  ...rest
}) => {
  // TODO: Throw an error if no indexBy prop is set and there is no matching attribute in a data object

  const CHART_CONFIG = {
    ...CHART_DEFAULTS,
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
    colors: { scheme: CHART_DEFAULTS.colors },
    labelSkipHeight: 12,
    labelSkipWidth: 12,
    margin: {
      bottom: axisBottomLabel ? 48 : 32,
      left: axisLeftLabel ? 60 : 48,
      right: 16,
      top: 32,
    },
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
