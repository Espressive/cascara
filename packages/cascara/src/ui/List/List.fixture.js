import React from 'react';
import List from './List';

const users = [
  {
    pre: (
      <img
        alt='avatar'
        className='ui avatar image'
        src='https://i.pravatar.cc/150?img=1'
      />
    ),
    label: 'Jack Wilshere',
    description: 'Central Attacking Midfielder',
  },
  {
    pre: (
      <img
        alt='avatar'
        className='ui avatar image'
        src='https://i.pravatar.cc/150?img=2'
      />
    ),
    label: 'Carlos Vela',
    // description: 'Central Forward',
  },
  {
    pre: (
      <img
        alt='avatar'
        className='ui avatar image'
        src='https://i.pravatar.cc/150?img=3'
      />
    ),
    label: 'Hector Bellerin',
    description: 'Right Back',
    post: 'Hey',
  },
];

const Loading = (fixtureProps) => (
  <div className='ui container'>
    <h2>Loading/No Props</h2>
    <p>When data is undefined or null, we will show a loading state.</p>
    <List {...fixtureProps} />
  </div>
);

const Empty = (fixtureProps) => (
  <div className='ui container'>
    <h2>Empty</h2>
    <p>When data is an empty array, we will show an empty state.</p>

    <List {...fixtureProps} />
  </div>
);

const Basic = (fixtureProps) => (
  <div className='ui container'>
    <h2>Basic</h2>
    <p>Basic usage of list.</p>
    <List {...fixtureProps} />
  </div>
);

export default {
  loading: <Loading />,
  empty: <Empty data={[]} />,
  basic: <Basic data={users} />,
};
