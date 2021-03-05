import React from 'react';
import pt from 'prop-types';
import { ResponsiveBar } from '@nivo/bar';
import Widget, { propTypes as widgetPT } from './Widget';
import { AXIS_CONFIG, CHART_DEFAULTS } from './widgetConfig';

const propTypes = {
  ...widgetPT,
  /** Can have a bottom axis label */
  axisBottomLabel: pt.string,
  /** Can have a left axis label */
  axisLeftLabel: pt.string,
  /** Data to display in a widget */
  data: pt.oneOfType([pt.array, pt.object]).isRequired,
  /** The unique value to index by on `data` */
  indexBy: pt.string,
  /** Values to show from `data` */
  keys: pt.arrayOf(pt.shape({})),
  /** The value to use for displaying bar labels */
  label: pt.string,
  /** Direction to orient the bar */
  layout: pt.oneOf(['horizontal', 'vertical']),
};

/**
 * Widget for @nivo/bar.
 */
const WidgetBar = ({
  axisBottomLabel,
  axisLeft,
  axisLeftLabel,
  data,
  indexBy = 'id',
  keys,
  label = 'value',
  layout = 'vertical',
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
      left: axisLeft ? (axisLeftLabel ? 60 : 48) : axisLeftLabel ? 60 : 16,
      right: 16,
      top: 32,
    },
  };

  return (
    <Widget {...rest}>
      <ResponsiveBar
        {...CHART_CONFIG}
        axisLeft={axisLeft}
        data={data}
        indexBy={indexBy}
        keys={keys}
        label={label}
        layout={layout}
      />
    </Widget>
  );
};

WidgetBar.propTypes = propTypes;
WidgetBar.displayName = 'bar';

export { propTypes };

export default WidgetBar;
