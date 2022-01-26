import React from 'react';
import Pagination, { usePaginationState } from './';
import { JsonPlaceholder } from '../../scaffolding';

const Loading = (fixtureProps) => (
  <>
    <h2>Loading/No Props</h2>
    <p>
      When defining no props, the component should not blow up. This is also a
      potential state the component might be in during loading. Any interactive
      elements should be disabled.
    </p>
    <Pagination {...fixtureProps} />
  </>
);

const Empty = (fixtureProps) => (
  <>
    <h2>Empty</h2>
    <p>
      After loading data and passing props to our component, it is possible we
      might have an empty length of data. We should still have disabled inputs
      but we will also give the user additional indication that there are no
      records to display.
    </p>
    <Pagination {...fixtureProps} />
  </>
);

const DataLengthNoState = (fixtureProps) => (
  <>
    <h2>Records, no state</h2>
    <p>
      When we have a totalRecordCount greater than 1, we should show the
      pagination values. Nothing is broken and it presents correctly, but
      changing pages will not work yet until we implement the usePagination()
      state hook. We log this warning in development environments if state hooks
      are missing.
    </p>
    <Pagination {...fixtureProps} />
  </>
);

const WithStateHook = (fixtureProps) => {
  const paginationState = usePaginationState();
  return (
    <>
      <h2>With State Hook</h2>
      <p>
        When using a state hook, we can pass the state values into a state prop
        on the Pagination component. This also allows more than one Pagination
        component to share the same state if we are placing multiple Pagination
        components on a long page.
      </p>
      <Pagination {...fixtureProps} state={paginationState} />
      <Pagination {...fixtureProps} state={paginationState} />
      <JsonPlaceholder data={paginationState} isInitialOpen title='state' />
    </>
  );
};

export default {
  loading: <Loading />,
  empty: <Empty totalRecordCount={0} />,
  totalRecordCountNoState: <DataLengthNoState totalRecordCount={64} />,
  withStateHook: <WithStateHook totalRecordCount={462} />,
};
