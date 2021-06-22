import React from 'react';
import Tooltip from './Tooltip';

const TRIGGER = (
  <button className='ui basic button' type='button'>
    Button
  </button>
);

const Fixture = () => {
  return (
    <div style={{ padding: '5em' }}>
      <Tooltip content='Hello'>{TRIGGER}</Tooltip>
    </div>
  );
};

export default Fixture;
