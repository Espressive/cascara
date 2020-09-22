import React, { useContext } from 'react';

import Button from '../Button';

import TableContext from './context';
import SelectionToggle from './atoms/SelectionToggle';
import ActionBar from './ActionBar';

const TableRow = ({ id, columns }) => {
  const { actions, handleOnAction, selectionIsEnabled } = useContext(
    TableContext
  );
  const selectionCell = (
    <td key={`${id}-select`}>
      <SelectionToggle id={id} />
    </td>
  );
  const actionBarCell = (
    <td key={`${id}-actionbar`}>
      <ActionBar
        actions={actions.map((action) => (
          <Button
            {...action}
            content={action.label}
            key={action.label}
            onClick={() => handleOnAction(action, id)}
          />
        ))}
      />
    </td>
  );

  const rowCells = columns.map((column) => {
    if (column.attribute === 'avatar') {
      return (
        <td key={column.attribute}>
          <img
            alt={'avatar'}
            src={`${column.value}`}
            style={{ borderRadius: '50%', width: '1.5em' }}
          />
        </td>
      );
    }

    return <td key={column.attribute}>{`${column.value}`}</td>;
  });

  if (selectionIsEnabled) {
    rowCells.unshift(selectionCell);
  }
  if (actions.length) {
    rowCells.push(actionBarCell);
  }

  return <tr key={id}>{rowCells}</tr>;
};

export default TableRow;
