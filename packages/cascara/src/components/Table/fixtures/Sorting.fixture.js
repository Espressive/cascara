import React from 'react';
import { Provider } from 'reakit';

import Table from '../Table';
import { results } from '../data/entities';

import { ACTIONS, COLUMNS } from './constants';

const resultsWithAlphabeticalOrder = results.map((result, idx) => {
  result.eid = String.fromCharCode(idx + 97).repeat(10);

  return result;
});
const DataWithSorting = ({ title, description, ...fixtureProps }) => (
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
  allAttributesSort: (
    <DataWithSorting
      actions={ACTIONS}
      data={resultsWithAlphabeticalOrder}
      dataDisplay={COLUMNS}
      description='The table is sortable by ALL columns, ascending'
      onAction={console.log}
      selections
      sortable
      title='All atributes sort'
      uniqueIdAttribute='eid'
    />
  ),
  arbitraryAttributesSort: (
    <DataWithSorting
      actions={ACTIONS}
      data={resultsWithAlphabeticalOrder}
      dataDisplay={COLUMNS}
      description='The table is sortable by eID and name, ascending'
      onAction={console.log}
      selections
      sortable={['eid', 'name']}
      title='Arbitrary attribute list sort'
      uniqueIdAttribute='eid'
    />
  ),
  singleAttributesSort: (
    <DataWithSorting
      actions={ACTIONS}
      data={resultsWithAlphabeticalOrder}
      dataDisplay={COLUMNS}
      description='The table is sortable by eID, ascending'
      onAction={console.log}
      selections
      sortable='eid'
      title='Single attribute sort'
      uniqueIdAttribute='eid'
    />
  ),
};
