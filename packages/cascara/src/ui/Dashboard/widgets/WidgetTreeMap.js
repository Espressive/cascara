import React from 'react';
import Widget from './Widget';
import JsonPlaceholder from '../../../placeholders/JsonPlaceholder';

const WidgetTreeMap = ({ data }) => (
  <Widget>
    <JsonPlaceholder data={data} title='WidgetTreeMap' />
  </Widget>
);

export default WidgetTreeMap;
