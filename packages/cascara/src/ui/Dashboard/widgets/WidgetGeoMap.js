import React from 'react';
import { ResponsiveChoroplethCanvas } from '@nivo/geo';
import Widget from './Widget';
import GeoMapFeatures from './GeoMapFeatures';

const WidgetGeoMap = ({ data, ...rest }) => {
  const largestValue = Math.max.apply(
    Math,
    data.map((object) => object.value)
  );

  const CHART_CONFIG = {
    // colors: ['#2d42ac', '#236596', '#18877f', '#0da968', '#02cb51'],
    colors: 'nivo',
    domain: [0, largestValue],
    enableGraticule: true,
    graticuleLineColor: 'rgba(0,0,0,.125)',
    label: 'properties.name',
    projectionTranslation: [0.5, 0.65],
    unknownColor: 'rgba(0,0,0,.05)',
  };

  return (
    <Widget {...rest}>
      <ResponsiveChoroplethCanvas
        {...CHART_CONFIG}
        data={data}
        features={GeoMapFeatures.features}
      />
    </Widget>
  );
};

export default WidgetGeoMap;
