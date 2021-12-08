import React, { useContext } from 'react';
import styles from './Table_OLD.module.scss';

import { Boundaries } from '../../system-components';
import { ModuleContext } from '../../modules/context';
import TableRowOld from './TableRow_OLD';

const TableBodyOld = () => {
  const { data, dataDisplay, uniqueIdAttribute } = useContext(ModuleContext);

  const rows = data?.map((data) => ({
    columns: dataDisplay?.map((itemConfig) => ({
      ...itemConfig,
    })),
    data,
    id: data[uniqueIdAttribute],
  }));

  return (
    <Boundaries>
      <tbody className={styles.BodyContainer}>
        {rows?.map((record) => {
          const { data, ...rest } = record;

          return <TableRowOld config={rest} key={record.id} record={data} />;
        })}
      </tbody>
    </Boundaries>
  );
};

export default TableBodyOld;
