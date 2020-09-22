import React, { useContext } from 'react';

import TableContext from './context';
import SelectionToggle from './atoms/SelectionToggle';

const TableHeader = () => {
  const { actions, dataConfig, selectionIsEnabled } = useContext(TableContext);
  const selectionCell = (
    <th key={'main-toggle'}>
      <SelectionToggle id={'__ALL__'} />
    </th>
  );
  const headerCells = dataConfig.display.map((column) => (
    <th key={column.attribute}>{column.label}</th>
  ));

  if (selectionIsEnabled) {
    headerCells.unshift(selectionCell);
  }
  if (actions.length) {
    headerCells.push(<th key={'action-bar-slot'} />);
  }

  return (
    <thead>
      <tr>{headerCells}</tr>
    </thead>
  );
};

export default TableHeader;
