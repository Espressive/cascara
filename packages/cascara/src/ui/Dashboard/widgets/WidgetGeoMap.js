import React from 'react';
import { ResponsiveChoroplethCanvas } from '@nivo/geo';
import GeoMapFeatures from './GeoMapFeatures';
// import JsonPlaceholder from '../../../placeholders/JsonPlaceholder'
import styles from '../Dashboard.module.scss';

const WidgetGeoMap = ({ data, title = 'WidgetGeoMap' }) => {
  const largestValue = Math.max.apply(
    Math,
    data.map((object) => object.value)
  );

  const CHART_CONFIG = {
    colors: ['#2d42ac', '#236596', '#18877f', '#0da968', '#02cb51'],
    domain: [0, largestValue],
    enableGraticule: true,
    graticuleLineColor: 'rgba(0,0,0,.125)',
    label: 'properties.name',
    projectionTranslation: [0.5, 0.65],
    unknownColor: 'rgba(0,0,0,.05)',
  };

  return (
    <div className={styles.GeoMap}>
      <h3 className={styles.Title}>{title}</h3>
      <div className={styles.Data} style={{ height: '400px' }}>
        <ResponsiveChoroplethCanvas
          {...CHART_CONFIG}
          data={data}
          features={GeoMapFeatures.features}
        />
      </div>
      {/* <JsonPlaceholder data={data} title='WidgetGeoMap' /> */}
    </div>
  );
};

export default WidgetGeoMap;
