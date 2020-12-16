import React from 'react';
import Popover from './Popover';

const trigger = <button className='ui basic button'>Hello</button>;

const Fixture = () => (
  <main className='ui container'>
    <Popover content={'Hello!'} trigger={trigger} />
  </main>
);

export default Fixture;
