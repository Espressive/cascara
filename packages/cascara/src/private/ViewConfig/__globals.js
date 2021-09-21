import React from 'react';
import pt from 'prop-types';
import { Button } from 'reakit/Button';
import { InlineIcon } from '@iconify/react';
import { eyeIcon } from '@espressive/icons';

export const DEFAULT_TRIGGER = (
  <Button className='ui basic icon button'>
    <InlineIcon icon={eyeIcon} />
  </Button>
);

export const STATE_SHAPE = pt.exact({
  currentSelection: pt.arrayOf(pt.object),
  itemAdd: pt.func.isRequired,
  itemRemove: pt.func.isRequired,
  moveItemDown: pt.func.isRequired,
  moveItemUp: pt.func.isRequired,
});
