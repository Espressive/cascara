import React, { useContext } from 'react';

import TableContext from './context';
import SelectionToggle from './atoms/SelectionToggle';
import ActionBar from './ActionBar';

const TableHeader = () => {
  const {
    actions,
    bulkActions,
    dataConfig,
    handleOnAction,
    selection,
    selectionIsEnabled,
  } = useContext(TableContext);
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
      {selection.length && bulkActions.length ? (
        <tr>
          <th
            colSpan={headerCells.length}
            scope={'colgroup'}
            style={{
              gridColumnEnd: headerCells.length + 1,
              gridColumnStart: 1,
            }}
          >
            <ActionBar
              actions={bulkActions.map((action) => (
                <button
                  data-action={`${action.label}`}
                  key={action.label}
                  onClick={(e, data) => {
                    const {
                      currentTarget: {
                        dataset: { action },
                      },
                    } = e;

                    handleOnAction(action);
                  }}
                >
                  {action.label}
                </button>
              ))}
              title={`${selection.length} selected`}
            />
          </th>
        </tr>
      ) : null}
    </thead>
  );
};

export default TableHeader;
