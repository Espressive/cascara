import React, { useContext } from 'react';

import ErrorBoundary from '../../shared/ErrorBoundary';
import { ModuleContext } from '../../modules/context';
import TableRow from './TableRow';

const TableBody = () => {
  const { data, dataConfig } = useContext(ModuleContext);
  const { uniqueIdAttribute } = dataConfig;

  const rows = data.map((data) => ({
    columns: dataConfig.display.map((itemConfig) => ({
      ...itemConfig,
      value: data[itemConfig.attribute],
    })),
    data,
    id: data[uniqueIdAttribute],
  }));

  return (
    <ErrorBoundary>
      <tbody>
        {rows.map((record) => {
          const { data, ...rest } = record;

          return (
            <TableRow config={{ ...rest }} key={record.id} record={data} />
          );
        })}
      </tbody>
    </ErrorBoundary>
  );
};

export default TableBody;
