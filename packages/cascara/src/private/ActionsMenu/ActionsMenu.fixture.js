import React from 'react';
import ActionsMenu from '.';

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

const Basic = (
  <main className='ui container'>
    <h2>Basic</h2>
    <p>
      This uses Popover from Reakit under the hood. This new version of Reakit
      allows us to use modifiers on popper.js. For now we will be using this
      inside Table Actions to stack any of our `actions.length &gt; 1` inside of
      this menu.
    </p>
    <ActionsMenu actions={menuItems} />
  </main>
);

export default {
  basic: Basic,
};
