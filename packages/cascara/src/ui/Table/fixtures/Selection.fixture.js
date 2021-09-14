import React from 'react';
import { Provider } from 'reakit';

import Table from '../Table';
import { results } from '../data/entities';

import { ACTIONS, COLUMNS } from './constants';

const DataWithDisplay = (fixtureProps) => (
  <>
    <h3>
      Data With <code>Selection</code>
    </h3>
    <p>TBD</p>
    <div style={{ columnCount: 2 }}>
      <p>TBD</p>
    </div>

    <Provider>
      <Table {...fixtureProps} />
    </Provider>
  </>
);

export default {
  withSelection: (
    <DataWithDisplay
      actions={ACTIONS}
      data={results}
      dataDisplay={COLUMNS}
      onAction={console.log}
      selections
      uniqueIdAttribute='eid'
    />
  ),
};
