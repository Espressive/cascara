import React, { useContext } from 'react';
import { ModuleContext } from '../../modules/context';
import styles from './Table.module.scss';

import { Boundaries } from '../../system-components';
import TableRow from './TableRow';

const TableBody = () => {
  const { data, dataDisplay, uniqueIdAttribute } = useContext(ModuleContext);

  const rows = data?.map((rowData) => ({
    columns: dataDisplay?.map((itemConfig) => ({
      ...itemConfig,
    })),
    id: data[uniqueIdAttribute],
    rowData,
  }));

  return (
    <Boundaries>
      <tbody className={styles.BodyContainer}>
        {rows?.map(({ rowData }, i) => (
          <TableRow key={i} rowData={rowData} />
        ))}
      </tbody>
    </Boundaries>
  );
};

export default TableBody;
