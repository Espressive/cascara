import React from 'react';
import './TableStyleTest.module.scss';

import './style.css';

import { generateFakeEmployees } from './mockData';

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
};

const Table = ({ data, config }) => {
  const rows = data.map((obj) => {
    const displayData = config?.display.map((itemConfig) => ({
      ...itemConfig,
      value: obj[itemConfig.attribute],
    }));

    return displayData;
  });

  const columns = config.display.map((column) => <th>{column.label}</th>);

  if (config.bulkActions?.length) {
    columns.push(
      <th>
        {config.bulkActions.map((action) => (
          <button key={action.label}>{action.label}</button>
        ))}
      </th>
    );
  }

  return (
    <table>
      <thead>
        <tr>{columns}</tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr>
            {row
              .map((cell) => <td key={cell.attribute}>{cell.value}</td>)
              .concat([
                <td>
                  {config.actions.map((action) => (
                    <button key={action.label}>{action.label}</button>
                  ))}
                </td>,
              ])}
          </tr>
        ))}
      </tbody>
      <tfoot>{<tr>{columns}</tr>}</tfoot>
    </table>
  );
};

const Fixture = <Table config={dataConfig} data={fakeEmployees} />;

export default Fixture;
