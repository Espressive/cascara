import React from 'react';

import { generateFakeInteractions } from '../../../lib/mock/fakeData';
import Table from '..';

const FAKE_DATA = generateFakeInteractions(10).map((interaction) => ({
  ...interaction,
}));

const Fixture = () => {
  return (
    <>
      <p>
        This table has no dataDisplay configured, so it will show all data using
        the basic text module
      </p>
      <Table data={FAKE_DATA} uniqueIdAttribute={'eid'} />
    </>
  );
};

export default Fixture;
