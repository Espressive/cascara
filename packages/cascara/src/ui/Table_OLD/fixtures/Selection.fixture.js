import React from 'react';
import { Provider } from 'reakit';

import TableOld from '../Table_OLD';
import { results } from '../data/entities';

import { ACTIONS, COLUMNS } from './constants';

const DataWithDisplay = ({ title, description, ...fixtureProps }) => (
  <>
    <h3>{title}</h3>
    <div>
      <p>{description}</p>
    </div>

    <Provider>
      <TableOld {...fixtureProps} />
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
};
