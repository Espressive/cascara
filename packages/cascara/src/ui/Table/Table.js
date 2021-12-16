import React from 'react';

import { Boundaries } from '../../system-components';

import TableBase from './TableBase';
import TableLoading from '../../private/TemporaryLoading';
import TableEmpty from '../../private/TemporaryEmpty';

import { PROP_TYPES } from './__globals';

const Table = (props) => {
  const { data } = props;
  return (
    <Boundaries>
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
    </Boundaries>
  );
};

Table.propTypes = PROP_TYPES;

export default Table;
