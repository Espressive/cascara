import React from 'react';
import pt from 'prop-types';
import { Button } from 'reakit/Button';
import { InlineIcon } from '@iconify/react';
import { verticalmenuIcon } from '@espressive/icons';
import styles from '../../shared/TempTriggerButton.module.scss';

export const DEFAULT_TRIGGER = (
  <Button className={`${styles._} ui basic icon button`}>
    <InlineIcon icon={verticalmenuIcon} />
  </Button>
);

export const ACTION_SHAPE = pt.shape({
  label: pt.string,
  onClick: pt.func,
});

export const ACTION_STACK_PROP_TYPES = {
  actions: pt.arrayOf(ACTION_SHAPE).isRequired,
  isInitialOpen: pt.bool,
  placement: pt.oneOf(['bottom-end', 'bottom-start']),
  title: pt.string,
  trigger: pt.node,
};
