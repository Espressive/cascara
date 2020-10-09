import React, { useContext } from 'react';

import { ModuleContext } from '../../modules/context';

const TableHeader = () => {
  const { dataConfig } = useContext(ModuleContext);
  const headerCells = dataConfig.display.map((column) => (
    <th key={column.attribute}>{column.label}</th>
  ));

  if (dataConfig.actions && dataConfig.actions.length) {
    headerCells.push(<th key={'action-bar-slot'} />);
  }

  return (
    <thead>
      <tr>{headerCells}</tr>
    </thead>
  );
};

export default TableHeader;
