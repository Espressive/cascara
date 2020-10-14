import React from 'react';
import { ResponsiveTreeMapCanvas } from '@nivo/treemap';
import Widget from './Widget';

const WidgetTreeMap = ({
  data,
  indexBy = 'id',
  label = 'loc',
  labelFormat = '.0s',
  value = 'loc',
  ...rest
}) => {
  const CHART_CONFIG = {
    animate: true,
    borderColor: {
      from: 'color',
      modifiers: [['darker', 0.3]],
    },
    innerPadding: 4,
    labelSkipSize: 15,
    labelTextColor: {
      from: 'color',
      modifiers: [['darker', 1.2]],
    },
    margin: {
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    },
    motionDamping: 11,
    motionStiffness: 90,
    outerPadding: 4,
  };

  return (
    <Widget {...rest}>
      <ResponsiveTreeMapCanvas
        {...CHART_CONFIG}
        identity={indexBy}
        label={label}
        labelFormat={labelFormat}
        root={data}
        value={value}
      />
    </Widget>
  );
};

export default WidgetTreeMap;
