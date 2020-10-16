import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import Widget from './Widget';
import { CHART_DEFAULTS, COLOR_MODIFIER } from './widgetConfig';

const WidgetPie = ({ data, ...rest }) => {
  const CHART_CONFIG = {
    ...CHART_DEFAULTS,
    colors: { scheme: CHART_DEFAULTS.colors },
    innerRadius: 0.3,
    margin: {
      bottom: 16,
      left: 32,
      right: 32,
      top: 16,
    },
    padAngle: 2,
    radialLabelsLinkColor: COLOR_MODIFIER,
    radialLabelsLinkDiagonalLength: 16,
    radialLabelsLinkHorizontalLength: 16,
    radialLabelsSkipAngle: 10,
    slicesLabelsSkipAngle: 10,
    slicesLabelsTextColor: COLOR_MODIFIER,
  };

  return (
    <Widget {...rest}>
      <ResponsivePie {...CHART_CONFIG} data={data} />
    </Widget>
  );
};

export default WidgetPie;
