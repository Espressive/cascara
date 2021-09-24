import React from 'react';
import pt from 'prop-types';
import { Button } from 'reakit/Button';
import { InlineIcon } from '@iconify/react';
import { eyeIcon } from '@espressive/icons';
import styles from '../../shared/TempTriggerButton.module.scss';

export const DEFAULT_TRIGGER = (
  <Button className={`${styles._} ui basic icon button`}>
    <InlineIcon icon={eyeIcon} />
  </Button>
);

export const LOADING_TRIGGER = (
  <Button className='ui basic loading icon button' disabled>
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

export const VIEW_CONFIG_PROP_TYPES = {
  isInitialOpen: pt.bool,
  options: pt.arrayOf(pt.object).isRequired,
  placement: pt.oneOf(['bottom-end', 'bottom-start']),
  state: STATE_SHAPE,
  title: pt.string,
  trigger: pt.node,
};
