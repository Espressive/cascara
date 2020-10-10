import React from 'react';
import JsonPlaceholder from '../../../placeholders/JsonPlaceholder';

const data = [];

const DashboardPAC = ({ data }) => {
  return (
    <div>
      <JsonPlaceholder data={data} isInitialOpen title='data' />
    </div>
  );
};

const Fixture = <DashboardPAC data={data} />;

export default Fixture;
