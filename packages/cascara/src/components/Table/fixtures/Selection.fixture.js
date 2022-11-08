import React from 'react';
import { Provider } from 'reakit';

import Table from '../Table';
import { results } from '../data/entities';

import { ACTIONS, COLUMNS } from './constants';

const DataWithDisplay = ({ title, description, ...fixtureProps }) => (
  <>
    <h3>{title}</h3>
    <div>
      <p>{description}</p>
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
      description='Regular selection, with no ALL nor LIMITED'
      onAction={console.log}
      selections
      title='Regular selection'
      uniqueIdAttribute='eid'
    />
  ),
  withLimitedSelection: (
    <DataWithDisplay
      actions={ACTIONS}
      data={results}
      dataDisplay={COLUMNS}
      description='Selection can be limited to a given number of records'
      onAction={console.log}
      selections={{ max: 2 }}
      title='Limited Selection'
      uniqueIdAttribute='eid'
    />
  ),
  withSelectedRows: (
    <DataWithDisplay
      actions={ACTIONS}
      data={results}
      dataDisplay={COLUMNS}
      description='Selection can be limited to a given number of records'
      onAction={console.log}
      selections={{
        selectedRows: [
          '1a180380-fc30-4117-ae79-dac13fc0ef38',
          '0ac3bc2d-a19b-4ec2-a4de-74abbfe24d4a',
          '9e3c8e81-ab24-49fc-8204-5c1f9467802c',
        ],
      }}
      title='Limited Selection'
      uniqueIdAttribute='eid'
    />
  ),
  singleLined: (
    <DataWithDisplay
      actions={ACTIONS}
      data={results}
      dataDisplay={COLUMNS}
      description={`Regular selection, with no ALL nor LIMITED
      Also with a NO-Stripped style, to use this set the prop singleLined along with the actions, data, dataDisplay props`}
      onAction={console.log}
      selections
      singleLined
      title='Regular selection'
      uniqueIdAttribute='eid'
    />
  ),
};
