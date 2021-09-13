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

const Basic = (fixtureProps) => (
  <div className='ui container'>
    <h2>Basic</h2>
    <p>
      The dropdown item will be replacced by an ellipsis button. This
      presentation is only temporary to validate the API needed.
    </p>
    <ActionStack {...fixtureProps} />
  </div>
);

export default {
  basic: <Basic actions={ACTIONS} />,
};
