import React from 'react';

import { TableContextProvider } from './context/TableContext';

import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';

const Table = ({ data, dataConfig, onAction }) => {
  const { actions, bulkActions, display } = dataConfig;
  let columnCount = display.length;

  if (bulkActions.length) {
    columnCount++;
  }

  if (actions.length) {
    columnCount++;
  }

  return (
    <TableContextProvider
      data={data}
      dataConfig={dataConfig}
      onAction={onAction}
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
    </TableContextProvider>
  );
};

export default Table;
