import React, { useContext } from 'react';
import styles from './Table.module.scss';

import ErrorBoundary from '../../shared/ErrorBoundary';
import { ModuleContext } from '../../modules/context';
import TableRow from './TableRow';

const TableBody = () => {
  const { data, dataConfig, uniqueIdAttribute } = useContext(ModuleContext);
  const bodyKey = Date.now();

  const rows = data.map((recordData) => ({
    columns: dataConfig.display.map((itemConfig) => ({
      ...itemConfig,
    })),
    id: recordData[uniqueIdAttribute],
    recordData,
  }));

  return (
    <ErrorBoundary>
      <tbody className={styles.BodyContainer} key={bodyKey}>
        {rows.map((record) => {
          const { recordData, ...rest } = record;

          return <TableRow config={rest} key={record.id} record={recordData} />;
        })}
      </tbody>
    </ErrorBoundary>
  );
};

export default TableBody;
