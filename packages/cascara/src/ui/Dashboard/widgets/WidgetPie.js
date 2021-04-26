import React from 'react';
import pt from 'prop-types';
import { ResponsivePie } from '@nivo/pie';
import Widget, { propTypes as widgetPT } from './Widget';
import { CHART_DEFAULTS, COLOR_MODIFIER, MARGIN_CONFIG } from './widgetConfig';

const propTypes = {
  ...widgetPT,
  /** Data to display in a widget */
  data: pt.oneOfType([pt.array, pt.object]).isRequired,
};

const CHART_CONFIG = {
  ...CHART_DEFAULTS,
  colors: { scheme: CHART_DEFAULTS.colors },
  innerRadius: 0.3,
  margin: MARGIN_CONFIG,
  padAngle: 2,
  radialLabelsLinkColor: COLOR_MODIFIER,
  radialLabelsLinkDiagonalLength: 16,
  radialLabelsLinkHorizontalLength: 16,
  radialLabelsSkipAngle: 10,
  sliceLabelsSkipAngle: 10,
  sliceLabelsTextColor: COLOR_MODIFIER,
};

/**
 * Widget for @nivo/pie.
 */
const WidgetPie = ({ data, ...rest }) => {
  return (
    <Widget {...rest}>
      <ResponsivePie {...CHART_CONFIG} data={data} />
    </Widget>
  );
};

WidgetPie.propTypes = propTypes;
WidgetPie.displayName = 'pie';

export { propTypes };

export default WidgetPie;
