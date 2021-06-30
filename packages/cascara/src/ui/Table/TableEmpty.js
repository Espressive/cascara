import React from 'react';
// import pt from 'prop-types';

const propTypes = {};

// These will be part of CSS modules once we finalize what these should look like
const temporaryEmptyStyles = {
  alignItems: 'center',
  display: 'flex',
  height: '10em',
  justifyContent: 'center',
};

const TableEmpty = () => {
  return (
    <div className='ui placeholder segment' style={temporaryEmptyStyles}>
      <em>No results...</em>
    </div>
  );
};

TableEmpty.propTypes = propTypes;

export default TableEmpty;
