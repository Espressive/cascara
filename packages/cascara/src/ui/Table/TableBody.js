import React, { useContext, useMemo } from 'react';
import styles from './Table.module.scss';

import { Boundaries } from '../../system-components';
import { ModuleContext } from '../../modules/context';
import TableRow from './TableRow';

const TableBody = () => {
  const { data, dataDisplay, uniqueIdAttribute } = useContext(ModuleContext);

  const rows = useMemo(
    () =>
      data?.map((data) => ({
        columns: dataDisplay?.map((itemConfig) => ({
          ...itemConfig,
        })),
        data,
        id: data[uniqueIdAttribute],
      })),
    [data, dataDisplay, uniqueIdAttribute]
  );

  return (
    <Boundaries>
      <tbody className={styles.BodyContainer}>
        {rows?.map((record) => {
          const { data, ...rest } = record;

          return <TableRow config={rest} key={record.id} record={data} />;
        })}
      </tbody>
    </Boundaries>
  );
};

export default TableBody;
