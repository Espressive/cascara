import React, { PureComponent } from 'react';
import { Dropdown, Header } from 'semantic-ui-react';
import moment from 'moment';

import './TableStyleTest.module.scss';
import { generateFakeEmployees } from '../../../lib/mock/generateFakeEmployees';
import Table from '../';

class Fixture extends PureComponent {
  state = {
    columns: [
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
      {
        attribute: 'eid',
        isEditable: false,
        label: 'ID',
        type: 'string',
      },
      {
        attribute: 'avatar',
        isEditable: false,
        label: 'Avatar',
        type: 'string',
      },
      {
        attribute: 'country',
        isEditable: false,
        label: 'Country',
        type: 'string',
      },
      {
        attribute: 'date',
        isEditable: false,
        label: 'Hired',
        type: 'date',
      },
      {
        attribute: 'department',
        isEditable: false,
        label: 'Department',
        type: 'string',
      },
      {
        attribute: 'nickname',
        isEditable: false,
        label: 'Nickname',
        type: 'string',
      },
      {
        attribute: 'officePhone',
        isEditable: false,
        label: 'Office phone',
        type: 'string',
      },
      {
        attribute: 'title',
        isEditable: false,
        label: 'Title',
        type: 'string',
      },
    ],
    data: generateFakeEmployees(50).map((employee) => ({
      ...employee,
      date: moment(employee.date, 'YYYYMMDD').fromNow(),
    })),
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

  handleColumnSelection = (_, { value: selectedColumns }) => {
    const { columns } = this.state;
    const newDisplay = columns
      .filter((column) => selectedColumns.includes(column.attribute))
      .reverse();

    this.setState({ display: newDisplay });
  };

  handleTableAction = (caller, data) => {
    const { display } = this.state;
    let csvHeader;
    let csvData;

    switch (caller.label) {
      case 'Export as CSV':
        csvHeader = display.reduce(
          (csvHeader, column, index, list) =>
            `${csvHeader}${column.label}${index < list.length - 1 ? ',' : ''}`,
          ''
        );

        csvData = data.reduce((csvData, row) => {
          const csvRow = Object.keys(row).reduce(
            (csvRow, column, index) =>
              `${csvRow}${row[column]}${
                index < Object.keys(row).length - 1 ? ',' : ''
              }`,
            ''
          );

          return `${csvData}
          ${csvRow}`;
        }, csvHeader);

        this.setState({ csvData });
        break;

      case 'Download':
        this.setState({ csvData: '' });
        break;

      default:
        return;
    }
  };

  render() {
    const { columns, data, display, csvData } = this.state;
    const bulkActions = csvData
      ? [
          {
            data: csvData,
            fileName: 'Espressive Table - Employee.csv',
            fileType: 'text/csv',
            label: 'Download',
            module: {
              type: 'download',
            },
          },
        ]
      : [
          {
            label: 'Export as CSV',
            module: {
              type: 'button',
            },
          },
        ];
    const dataConfig = {
      actions: [
        {
          label: 'View',
          module: 'button',
          size: 'small',
        },
        {
          cancellabel: 'Cancel',
          label: 'Edit',
          savelabel: 'Save',
          size: 'small',
          type: 'edit',
        },
        {
          label: 'Delete',
          module: 'button',
          outcome: 'negative',
          size: 'small',
        },
      ],
      bulkActions,
      display,
      uniqueIdAttribute: 'eid',
    };

    const availableColumns = columns.map((columnDef) => ({
      key: columnDef.attribute,
      text: columnDef.label,
      value: columnDef.attribute,
    }));

    const selectedColumns = display.map((columnDef) => columnDef.attribute);

    return (
      <>
        <Header as='h4'>
          <Header.Content>
            Displaying columns: <br />
            <Dropdown
              header='Select columns...'
              key={'select'}
              labeled
              multiple
              onChange={this.handleColumnSelection}
              options={availableColumns}
              placeholder='select columns... oh, great manu!'
              selectedLabel={'Display columns'}
              selection
              value={selectedColumns}
            />
          </Header.Content>
        </Header>

        <Table
          data={data}
          dataConfig={dataConfig}
          onAction={this.handleTableAction}
        />
      </>
    );
  }
}

export default Fixture;
