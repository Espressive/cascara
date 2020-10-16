import React from 'react';
import { ResponsiveChoroplethCanvas } from '@nivo/geo';
import Widget from './Widget';
import { CHART_DEFAULTS } from './widgetConfig';
import GeoMapFeatures from './GeoMapFeatures';

const WidgetGeoMap = ({ data, ...rest }) => {
  const largestValue = Math.max.apply(
    Math,
    data.map((object) => object.value)
  );

  const CHART_CONFIG = {
    ...CHART_DEFAULTS,
    borderColor: null,
    borderWidth: null,
    domain: [0, largestValue],
    enableGraticule: true,
    graticuleLineColor: 'rgba(0,0,0,.125)',
    label: 'properties.name',
    projectionScale: 88,
    projectionTranslation: [0.5, 0.65],
    unknownColor: 'rgba(0,0,0,.05)',
  };

  return (
    <Widget {...rest} height={320}>
      <ResponsiveChoroplethCanvas
        {...CHART_CONFIG}
        data={data}
        features={GeoMapFeatures.features}
      />
    </Widget>
  );
};

export default WidgetGeoMap;
