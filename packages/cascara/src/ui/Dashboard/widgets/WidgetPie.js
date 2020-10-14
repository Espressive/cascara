import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import Widget from './Widget';

const WidgetPie = ({ data, ...rest }) => {
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
    <Widget {...rest}>
      <ResponsivePie {...CHART_CONFIG} data={data} />
    </Widget>
  );
};

export default WidgetPie;
