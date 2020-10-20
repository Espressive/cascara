import React from 'react';
import pt from 'prop-types';
import { ResponsiveHeatMapCanvas } from '@nivo/heatmap';
import Widget, { propTypes as widgetPT } from './Widget';

const propTypes = {
  ...widgetPT,
  /** Data to display in a widget */
  data: pt.oneOfType([pt.array, pt.object]).isRequired,
  /** The unique value to index by on `data` */
  indexBy: pt.string,
};

/**
 * Widget for @nivo/heatmap.
 */
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
WidgetHeatMap.displayName = 'heat-map';

export { propTypes };

export default WidgetHeatMap;
