import React, { useContext } from 'react';
import styles from './Table.module.scss';

import ErrorBoundary from '../../private/ErrorBoundary';
import { ModuleContext } from '../../modules/context';
import TableRow from './TableRow';

const TableBody = () => {
  const { data, dataDisplay, uniqueIdAttribute } = useContext(ModuleContext);

  const rows = data?.map((data) => ({
    columns: dataDisplay?.map((itemConfig) => ({
      ...itemConfig,
    })),
    data,
    id: data[uniqueIdAttribute],
  }));

  return (
    <ErrorBoundary>
      <tbody className={styles.BodyContainer}>
        {rows?.map((record) => {
          const { data, ...rest } = record;

          return <TableRow config={rest} key={record.id} record={data} />;
        })}
      </tbody>
    </ErrorBoundary>
  );
};

export default TableBody;
