import React from 'react';
import { ResponsiveHeatMapCanvas } from '@nivo/heatmap';
import Widget from './Widget';

const WidgetHeatMap = ({ data, indexBy = 'id', ...rest }) => {
  return (
    <Widget {...rest}>
      <ResponsiveHeatMapCanvas
        data={data}
        indexBy={indexBy}
        keys={[
          'hot dog',
          'burger',
          'sandwich',
          'kebab',
          'fries',
          'donut',
          'junk',
          'sushi',
          'ramen',
          'curry',
          'udon',
        ]}
      />
    </Widget>
  );
};

export default WidgetHeatMap;
