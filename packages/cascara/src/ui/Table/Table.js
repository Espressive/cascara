import React from 'react';

import TableProvider from './context/TableProvider';

import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';

const Table = ({ data, dataConfig, onAction, uniqueIDAttribute, ...rest }) => {
  const { actions, display } = dataConfig;
  let columnCount = display.length;

  if (actions.length) {
    columnCount++;
  }

  return (
    <TableProvider
      value={{ data, dataConfig, onAction, uniqueIDAttribute }}
      {...rest}
    >
      <table
        style={{
          gridTemplateColumns: `repeat(${columnCount}, auto)`,
        }}
      >
        <TableHeader />
        <TableBody />
        <TableFooter />
      </table>
    </TableProvider>
  );
};

export default Table;
