import React from 'react';

import ErrorBoundary from '../../shared/ErrorBoundary';

import TableBase from './TableBase';
import TableLoading from './TableLoading';
import TableEmpty from './TableEmpty';

import { TABLE_SHAPE } from './__propTypes';

/** This is a Table */
const Table = (props) => {
  const { data } = props;
  return (
    // NOTE: This is likely a common pattern for us in Cascara and we may want
    // to evaluate how we present empty and loading component/state boilerplate.
    // 1. if data is undefined or null, render a loading state
    // 2. if data is an empty array, render an empty results message
    // 3. render the table data
    <ErrorBoundary>
      {data ? (
        data.length > 0 ? (
          // This is all of the logic that previously existed in this component.
          // Not sure if this is the correct strategy for this yet, but it was
          // a good way to make sure any logic for Table display did not blow up
          // if we have empty data or undefined in helper functions.
          <TableBase {...props} />
        ) : (
          // This is a temporary empty style.
          <TableEmpty />
        )
      ) : (
        // This is a temporary loading style. We will eventually define a loading style using the shape of modules.
        <TableLoading />
      )}
    </ErrorBoundary>
  );
};

Table.propTypes = TABLE_SHAPE;

export default Table;
