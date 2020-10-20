import React from 'react';
import { ResponsiveHeatMapCanvas } from '@nivo/heatmap';
import Widget, { propTypes as widgetPT } from './Widget';

const propTypes = {
  ...widgetPT,
};

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

WidgetHeatMap.propTypes = propTypes;
WidgetHeatMap.displayName = 'widget: heat-map';

export { propTypes };

export default WidgetHeatMap;
