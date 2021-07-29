import React from 'react';

const propTypes = {};

const temporaryEmptyStyles = {
  alignItems: 'center',
  display: 'flex',
  height: '10em',
  justifyContent: 'center',
};

const FormEmpty = () => (
  <div className='ui placeholder segment' style={temporaryEmptyStyles}>
    <em>No data...</em>
  </div>
);

FormEmpty.propTypes = propTypes;

export default FormEmpty;
