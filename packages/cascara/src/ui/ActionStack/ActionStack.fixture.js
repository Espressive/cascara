import React from 'react';
import ActionStack from './ActionStack';

const ACTIONS = [
  {
    label: 'Jack Wilshere',
    onClick: () => alert('JACK!'),
  },
  {
    label: 'Carlos Vela',
    onClick: () => alert('CARLOS!'),
  },
  {
    label: 'Hector Bellerin',
    onClick: () => alert('HECTOR!'),
  },
];

export default {
  noActions: <ActionStack />,
  default: <ActionStack actions={ACTIONS} />,
  allButtons: <ActionStack actions={ACTIONS} dropdownIndex={1000} />,
  allDropdown: <ActionStack actions={ACTIONS} dropdownIndex={0} />,
};
