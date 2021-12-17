import React from 'react';
import styles from './Table.module.scss';

import { Boundaries } from '../../system-components';
import TableRow from './TableRow';

const TableBody = ({ data, dataDisplay, actions }) => {
  return (
    <Boundaries>
      <tbody className={styles.BodyContainer}>
        {data?.map((rowData, i) => (
          <TableRow
            actions={actions}
            dataDisplay={dataDisplay}
            key={i}
            rowData={rowData}
          />
        ))}
      </tbody>
    </Boundaries>
  );
};

export default TableBody;
