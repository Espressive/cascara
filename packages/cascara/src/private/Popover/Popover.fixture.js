import React from 'react';
import Popover from './Popover';
import Button from '../../atoms/Button';
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

const PopoverFixture = (
  <main className='ui container'>
    <h1>Popover</h1>

    <Popover className='CAT' trigger={<Button content='Greeting' />}>
      Hello!
    </Popover>
  </main>
);

const ActionsMenuFixture = (
  <main className='ui container'>
    <h1>ActionsMenu</h1>
    <p>
      This uses Popover from Reakit under the hood. This new version of Reakit
      allows us to use modifiers on popper.js. For now we will be using this
      inside Table Actions to stack any of our `actions.length &gt; 1` inside of
      this menu.
    </p>
    <ActionsMenu actions={menuItems} aria-label='Menu' />
    <ActionsMenu actions={menuItems} aria-label='Menu' />
    <ActionsMenu actions={menuItems} aria-label='Menu' />
    <ActionsMenu actions={menuItems} aria-label='Menu' />
  </main>
);

export default {
  ActionsMenu: ActionsMenuFixture,
  Popover: PopoverFixture,
};
