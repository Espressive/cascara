import React from 'react';
import pt from 'prop-types';

const propTypes = {
  isMinimal: pt.bool,
};

const TemporaryEmpty = ({ isMinimal }) => (
  <div
    className={isMinimal ? 'ui basic segment' : 'ui segment'}
    style={isMinimal ? {} : { height: '10em' }}
  >
    <em>No data...</em>
  </div>
);

TemporaryEmpty.propTypes = propTypes;

export default TemporaryEmpty;
