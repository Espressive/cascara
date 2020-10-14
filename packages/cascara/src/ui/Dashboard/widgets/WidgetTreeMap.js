import React from 'react';
import { ResponsiveTreeMapCanvas } from '@nivo/treemap';
import Widget from './Widget';
import { CHART_DEFAULTS } from './widgetConfig';

const WidgetTreeMap = ({
  data,
  indexBy = 'id',
  label = 'loc',
  labelFormat = '.0s',
  value = 'loc',
  ...rest
}) => {
  const CHART_CONFIG = {
    ...CHART_DEFAULTS,
    colors: { scheme: CHART_DEFAULTS.colors },
    innerPadding: 4,
    labelSkipSize: 15,
    labelTextColor: '#555',
    margin: {
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    },
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
