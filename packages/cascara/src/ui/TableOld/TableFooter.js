import React, { useContext } from 'react';

import styles from './TableOld.module.scss';
import { Boundaries } from '../../system-components';
import { ModuleContext } from '../../modules/context';

const TableFooter = () => {
  const { dataDisplay } = useContext(ModuleContext);
  const headerCells = dataDisplay?.map((column) => (
    <th key={column.attribute}>{column.label}</th>
  ));

  return (
    <Boundaries>
      <tfoot className={styles.FootContainer}>
        <tr className={styles.Row} key={'foot-header'}>
          {headerCells}
        </tr>
      </tfoot>
    </Boundaries>
  );
};

export default TableFooter;
