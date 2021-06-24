import React from 'react';
// import pt from 'prop-types'

const propTypes = {};

const TableLoading = () => {
  return (
    <div className='ui segment' style={{ height: '10em' }}>
      <div className='ui active inverted dimmer'>
        <div className='ui text loader'>Loading</div>
      </div>
    </div>
  );
};

TableLoading.propTypes = propTypes;

export default TableLoading;
