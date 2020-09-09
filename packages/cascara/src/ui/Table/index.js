import React from 'react';

import { TableContextProvider } from './context/TableContext';
import Table from './Table';

export default ({ data, dataConfig, onAction }) => (
  <TableContextProvider data={data} dataConfig={dataConfig} onAction={onAction}>
    <Table />
  </TableContextProvider>
);
