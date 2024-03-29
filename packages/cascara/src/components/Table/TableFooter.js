import React, { useContext } from 'react';

import styles from './Table.module.scss';
import Boundaries from '../../atoms/Boundaries';
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
