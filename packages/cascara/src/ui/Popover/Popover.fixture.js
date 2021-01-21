import React from 'react';
import Popover from './Popover';
import { Button } from '../../';
import ActionsMenu from '../ActionsMenu';

const menuItems = [
  {
    content: 'Delete Stuff',
    onClick: () => alert('Delete Stuff'),
  },
  {
    content: 'Update',
    onClick: () => alert('Update'),
  },
];

const Fixture = () => (
  <main className='ui container'>
    <h1>Popover</h1>

    <Popover trigger={<Button content='Greeting' />}>Hello!</Popover>

    <ActionsMenu items={menuItems} trigger={<Button content='More' />} />
  </main>
);

export default Fixture;
