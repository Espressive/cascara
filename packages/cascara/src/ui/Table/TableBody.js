import React, { useContext } from 'react';
import { ModuleContext } from '../../modules/context';
import styles from './Table.module.scss';

import { Boundaries } from '../../system-components';
import { JsonPlaceholder } from '../..';

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
    <Boundaries>
      <tbody className={styles.BodyContainer}>
        {rows?.map((record, i) => {
          const { data } = record;

          return <JsonPlaceholder data={data} key={i} />;
        })}
      </tbody>
    </Boundaries>
  );
};

export default TableBody;
