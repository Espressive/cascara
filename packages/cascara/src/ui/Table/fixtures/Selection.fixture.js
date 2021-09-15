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

  withAllSelection: (
    <DataWithDisplay
      actions={ACTIONS}
      data={results}
      dataDisplay={COLUMNS}
      description='Selection can be applied to ALL records'
      onAction={console.log}
      selections={{ UNSAFE_isSelectAll: true }}
      title='ALL selection'
      uniqueIdAttribute='eid'
    />
  ),

  withAllAndMaxSelection: (
    <DataWithDisplay
      actions={ACTIONS}
      data={results}
      dataDisplay={COLUMNS}
      description='When All and LIMITED selection are combined, LIMITED prevails'
      onAction={console.log}
      selections={{ UNSAFE_isSelectAll: true, max: 2 }}
      title='All and LIMITED selection'
      uniqueIdAttribute='eid'
    />
  ),

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
};
