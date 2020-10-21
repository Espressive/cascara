import React, { PureComponent } from 'react';
import { Dropdown, Header } from 'semantic-ui-react';

import './TableStyleTest.module.scss';
import { generateFakeEmployees } from '../../../lib/mock/generateFakeEmployees';
import Table from '..';
import dataTypes from '../dataTypes';

class Fixture extends PureComponent {
  state = {
    columns: [
      {
        attribute: 'active',
        isEditable: true,
        isLabeled: false,
        label: 'Active',
        module: dataTypes.bool.asCheckbox,
      },
      {
        attribute: 'eid',
        isEditable: false,
        isLabeled: false,
        label: 'ID',
        module: dataTypes.text.asText,
      },
      {
        attribute: 'email',
        isEditable: true,
        isLabeled: false,
        label: 'Email',
        module: dataTypes.text.asEmail,
      },
      {
        attribute: 'country',
        isEditable: true,
        isLabeled: false,
        label: 'Country',
        module: dataTypes.text.asSelect,
        options: [
          {
            label: 'Argentina',
            value: 'Argentina',
          },
          {
            label: 'Brazil',
            value: 'Brazil',
          },
          {
            label: 'USA',
            value: 'USA',
          },
        ],
      },
      {
        attribute: 'employeeNumber',
        isEditable: true,
        isLabeled: false,
        label: 'Employee Number',
        module: dataTypes.number.asNumber,
      },
      {
        attribute: 'fullName',
        isEditable: true,
        isLabeled: false,
        label: 'Full Name',
        module: dataTypes.text.asText,
      },
      {
        attribute: 'homePhone',
        isEditable: true,
        isLabeled: false,
        label: 'Home Phone',
        module: dataTypes.text.asText,
      },
      {
        attribute: 'officePhone',
        isEditable: true,
        isLabeled: false,
        label: 'Office Phone',
        module: dataTypes.text.asText,
      },
      {
        attribute: 'title',
        isEditable: true,
        isLabeled: false,
        label: 'Title',
        module: dataTypes.text.asText,
      },
    ],
    data: generateFakeEmployees(50).map((employee) => ({
      ...employee,
    })),
    display: [
      {
        attribute: 'fullName',
        isEditable: true,
        isLabeled: false,
        label: 'Full Name',
        module: dataTypes.text.asText,
      },
      {
        attribute: 'email',
        isEditable: true,
        isLabeled: false,
        label: 'Email',
        module: dataTypes.text.asEmail,
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

  handleOnSubmit = (values) => console.log('Form submitted: ', values);

  render() {
    const { columns, data, display, csvData } = this.state;
    const bulkActions = csvData
      ? [
          {
            content: 'Download',
            data: csvData,
            fileName: 'Espressive Table - Employee.csv',
            fileType: 'text/csv',
            isLabeled: false,
            module: 'download',
          },
        ]
      : [
          {
            content: 'Export as CSV',
            isLabeled: false,
            module: 'button',
          },
        ];
    const dataConfig = {
      actions: [
        {
          content: 'view',
          isLabeled: false,
          module: 'button',
          size: 'small',
        },
        {
          isLabeled: false,
          module: 'edit',
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
              placeholder='select columns...'
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
          onSubmit={this.handleOnSubmit}
        />
      </>
    );
  }
}

export default Fixture;
