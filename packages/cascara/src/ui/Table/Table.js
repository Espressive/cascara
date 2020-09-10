import React, { useContext } from 'react';

import TableContext from './context/TableContext';

import TableHeader from './TableHeader';
import TableBody from './TableBody';

const Table = () => {
  const {
    dataConfig: { actions, bulkActions, display },
  } = useContext(TableContext);
  let columnCount = display.length;

  if (bulkActions.length) {
    columnCount++;
  }

  if (actions.length) {
    columnCount++;
  }

  return (
    <table
      style={{
        gridTemplateColumns: `repeat(${columnCount}, auto)`,
      }}
    >
      <TableHeader />
      <TableBody />
      <TableHeader footer />
    </table>
  );
};

export default Table;
