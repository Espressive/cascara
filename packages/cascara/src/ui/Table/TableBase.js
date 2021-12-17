import React from 'react';
import styles from './Table.module.scss';
import TableProvider from './context/TableProvider';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

import { INFER_UNIQUE_ID, PROP_TYPES } from './__globals';

const TableBase = ({
  actions,
  data,
  dataDisplay,
  uniqueIdAttribute,
  ...rest
}) => {
  const classList = [styles.Table, rest.className];
  // Calculate our columns by taking the number of dataDisplay modules and adding
  // the boolean value of actions (1 true, 0 false)
  const columnCount = dataDisplay?.length + Boolean(actions);

  return (
    <TableProvider
      value={{
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
        <TableHeader
          dataDisplay={dataDisplay}
          isRowActionable={Boolean(actions)}
        />
        <TableBody data={data} dataDisplay={dataDisplay} actions={actions} />
      </table>
    </TableProvider>
  );
};

TableBase.propTypes = PROP_TYPES;

export default TableBase;
