import React, { useContext } from 'react';

import './TableStyleTest.module.scss';
import { generateFakeEmployees } from '../../../lib/mock/fakeData';

import TableContext, { TableContextProvider } from '../context/TableContext';
// import SelectionToggle from '../atoms/SelectionToggle';

const fakeEmployees = generateFakeEmployees(50);

const dataConfig = {
  actions: [
    {
      label: 'View',
      module: 'button',
    },
    {
      label: 'Edit',
      module: 'edit',
      moduleData: {
        cancelLabel: 'Cancel',
        saveLabel: 'Save',
      },
    },
    {
      label: 'Disable',
      module: 'button',
    },
  ],
  bulkActions: [
    {
      label: 'New',
      module: 'button',
    },
    {
      label: 'Delete',
      module: 'edit',
    },
  ],
  display: [
    {
      attribute: 'fullName',
      isEditable: false,
      label: 'Full Name',
      type: 'string',
    },
    {
      attribute: 'homePhone',
      isEditable: true,
      label: 'Home Phone',
      type: 'phone',
    },
  ],
  uniqueIdAttribute: 'eid',
};

const Table = () => {
  const {
    actions,
    bulkActions,
    data,
    dataConfig,
    selection,
    selectionIsEnabled,
    uniqueIdAttribute,
  } = useContext(TableContext);

  const columns = dataConfig.display.map((column) => (
    <th key={column.label}>{column.label}</th>
  ));
  if (bulkActions.length) {
    columns.push(<th />);
  }

  if (selectionIsEnabled) {
    columns.unshift(<th>[]</th>);
  }

  const actionBar = (
    <caption
      style={{
        gridColumnEnd: columns.length + 1,
      }}
    >
      <h4>{`${selection.length} selected`}</h4>
      <div
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridGap: '0.5em',
          gridTemplateRows: '2em',
        }}
      >
        {bulkActions?.map((action) => (
          <button key={action.label} type='button'>
            {action.label}
          </button>
        ))}
      </div>
    </caption>
  );

  // this will have its own context
  const renderRow = (row) => (
    <tr>
      {[<td key={`${row[uniqueIdAttribute]}`}>[]</td>].concat(
        dataConfig.display.map((column, i) => (
          <td key={`${row[uniqueIdAttribute]}-${row[column.attribute]}`}>
            {row[column.attribute]}
          </td>
        )),
        [
          <td key={`${row[uniqueIdAttribute]}0`}>
            {actions.map((action) => (
              <button key={action.label} type='button'>
                {action.label}
              </button>
            ))}
          </td>,
        ]
      )}
    </tr>
  );

  return (
    <table
      style={{
        gridTemplateColumns: `repeat(${columns.length}, auto)`,
      }}
    >
      {actionBar}
      <thead>
        <tr>{columns}</tr>
      </thead>
      <tbody>{data.map((row) => renderRow(row))}</tbody>
      <tfoot>{<tr>{columns}</tr>}</tfoot>
    </table>
  );
};

const Fixture = (
  <TableContextProvider data={fakeEmployees} dataConfig={dataConfig}>
    <Table />
  </TableContextProvider>
);

export default Fixture;
