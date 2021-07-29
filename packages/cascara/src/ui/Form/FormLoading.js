import React from 'react';

const propTypes = {};

const FormLoading = () => (
  <div className='ui segment' style={{ height: '10em' }}>
    <div className='ui active inverted dimmer'>
      <div className='ui text loader'>Loading</div>
    </div>
  </div>
);

FormLoading.propTypes = propTypes;

export default FormLoading;
