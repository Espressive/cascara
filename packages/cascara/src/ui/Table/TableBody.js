import React, { useContext } from 'react';

import TableContext from './context';
import TableRow from './TableRow';

const TableBody = () => {
  const { data, dataConfig, uniqueIdAttribute } = useContext(TableContext);
  const rows = data.map((record) => ({
    columns: dataConfig.display.map((itemConfig) => ({
      ...itemConfig,
      value: record[itemConfig.attribute],
    })),
    id: record[uniqueIdAttribute],
    key: record[uniqueIdAttribute],
  }));

  return (
    <tbody>
      {rows.map((record) => (
        <TableRow {...record} />
      ))}
    </tbody>
  );
};

export default TableBody;
