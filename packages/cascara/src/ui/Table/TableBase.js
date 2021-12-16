import React from 'react';
import styles from './Table.module.scss';
import TableProvider from './context/TableProvider';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

import { INFER_UNIQUE_ID, PROP_TYPES } from './__globals';

const TableBase = ({
  children,
  data,
  dataDisplay,
  uniqueIdAttribute,
  ...rest
}) => {
  const classList = [styles.Table, rest.className];
  const columnCount = dataDisplay?.length || 0;

  return (
    <TableProvider
      value={{
        data,
        dataDisplay,
        uniqueIdAttribute:
          uniqueIdAttribute || INFER_UNIQUE_ID(Object.keys(data[0])),
      }}
    >
      <table
        {...rest}
        className={classList.join(' ')}
        style={{
          gridTemplateColumns: `repeat(${columnCount}, auto)`,
        }}
      >
        <TableHeader />
        <TableBody />
        {children}
      </table>
    </TableProvider>
  );
};

TableBase.propTypes = PROP_TYPES;

export default TableBase;
