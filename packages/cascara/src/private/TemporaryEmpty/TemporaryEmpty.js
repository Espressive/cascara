import React from 'react';

const propTypes = {};

const temporaryEmptyStyles = {
  alignItems: 'center',
  display: 'flex',
  height: '10em',
  justifyContent: 'center',
};

const TemporaryEmpty = () => (
  <div className='ui placeholder segment' style={temporaryEmptyStyles}>
    <em>No data...</em>
  </div>
);

TemporaryEmpty.propTypes = propTypes;

export default TemporaryEmpty;
