import React from 'react';
import { Provider } from 'reakit';

import Table from '../Table';
import useTableSortState from '../state/useTableSortState';
import { SORT_ORDER } from '../state/sortingReducer';

import { results } from '../data/entities';
import { ACTIONS, COLUMNS } from './constants';

const DataWithSorting = ({
  title,
  description,
  initialSort,
  ...fixtureProps
}) => {
  const sortState = useTableSortState(initialSort);

  return (
    <>
      <h3>{title}</h3>
      <div>
        <p>{description}</p>
      </div>

      <Provider>
        <Table {...fixtureProps} sortState={sortState} />
      </Provider>
    </>
  );
};

export default {
  allAttributesSort: (
    <DataWithSorting
      actions={ACTIONS}
      data={results}
      dataDisplay={COLUMNS}
      description='The table is sortable by ALL columns, ascending'
      initialSort={{ attribute: 'name', order: SORT_ORDER.ASCENDING }}
      onAction={console.log}
      selections
      sortable
      title='All atributes sort'
      uniqueIdAttribute='name'
    />
  ),
  arbitraryAttributesSort: (
    <DataWithSorting
      actions={ACTIONS}
      data={results}
      dataDisplay={COLUMNS}
      description='The table is sortable by eid and name, ascending'
      initialSort={{ attribute: 'eid', order: SORT_ORDER.DESCENDING }}
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
      data={results}
      dataDisplay={COLUMNS}
      description='The table is sortable by eid, ascending'
      initialSort={{ attribute: 'eid', order: SORT_ORDER.ASCENDING }}
      onAction={console.log}
      selections
      sortable='eid'
      title='Single attribute sort'
      uniqueIdAttribute='eid'
    />
  ),
  withInitialSortConfig: (
    <DataWithSorting
      actions={ACTIONS}
      data={results}
      dataDisplay={COLUMNS}
      description='The table is sortable by ALL columns, ascending'
      initialSort={{ attribute: 'eid', order: SORT_ORDER.DESCENDING }}
      onAction={console.log}
      selections
      sortable
      title='All atributes sort'
      uniqueIdAttribute='eid'
    />
  ),
};
