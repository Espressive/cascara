import React from 'react';

import { generateFakeInteractions } from '../../../lib/mock/fakeData';
import Table from '..';

const FAKE_DATA = generateFakeInteractions(50).map((interaction) => ({
  ...interaction,
}));

const COLUMNS = [
  {
    attribute: 'created',
    isEditable: true,
    label: 'Created',
    module: 'text',
  },
  {
    attribute: 'phrase',
    isEditable: false,
    label: 'Phrase',
    module: 'text',
  },
  {
    attribute: 'user',
    isEditable: true,
    label: 'User',
    module: 'email',
  },
  {
    attribute: 'response',
    isEditable: true,
    label: 'Response',
    module: 'checkbox',
  },
  {
    attribute: 'deflected',
    isEditable: true,
    label: 'Deflected',
    module: 'checkbox',
  },
  {
    attribute: 'matchedIntent',
    isEditable: true,
    label: 'Matched Intent',
    module: 'text',
  },
];

const Fixture = () => {
  return (
    <>
      <p>This table has no actions, only data</p>
      <Table data={FAKE_DATA} dataDisplay={COLUMNS} uniqueIdAttribute={'eid'} />
    </>
  );
};

export default Fixture;
