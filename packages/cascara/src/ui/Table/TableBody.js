import React from 'react';
import pt from 'prop-types';
import styles from './Table.module.scss';

import { Boundaries } from '../../system-components';
import TableRow from './TableRow';

const propTypes = {
  actions: pt.arrayOf(pt.object),
  data: pt.arrayOf(pt.object),
  dataDisplay: pt.arrayOf(pt.object),
};

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

TableBody.propTypes = propTypes;

export default TableBody;
