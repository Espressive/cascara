import React, { PureComponent } from 'react';
import { Dropdown, Header } from 'semantic-ui-react';

import JsonPlaceholder from '../../../placeholders/JsonPlaceholder';

import { generateFakeInteractions } from '../../../lib/mock/fakeData';
import Table from '..';

const defaultColumns = [
  {
    attribute: 'created',
    isEditable: true,
    isLabeled: false,
    label: 'Created',
    module: 'text',
  },
  {
    attribute: 'phrase',
    isEditable: false,
    isLabeled: false,
    label: 'Phrase',
    module: 'text',
  },
  {
    attribute: 'user',
    isEditable: true,
    isLabeled: false,
    label: 'User',
    module: 'email',
  },
  {
    attribute: 'response',
    isEditable: true,
    isLabeled: false,
    label: 'Response',
    module: 'checkbox',
  },
  {
    attribute: 'deflected',
    isEditable: true,
    isLabeled: false,
    label: 'Deflected',
    module: 'checkbox',
  },
  {
    attribute: 'matchedIntent',
    isEditable: true,
    isLabeled: false,
    label: 'Matched Intent',
    module: 'text',
  },
];

class Fixture extends PureComponent {
  state = {
    columns: [...defaultColumns],
    data: generateFakeInteractions(50).map((interaction) => ({
      ...interaction,
    })),
    display: [...defaultColumns],
  };

  handleColumnSelection = (_, { value: selectedColumns }) => {
    const { columns } = this.state;
    const newDisplay = columns
      .filter((column) => selectedColumns.includes(column.attribute))
      .reverse();

    this.setState({ display: newDisplay });
  };

  handleRecordUpdate = (record) => {
    const { data } = this.state;

    const updatedData = data.map((recordInState) => {
      if (recordInState.eid !== record.eid) {
        return recordInState;
      }

      return {
        ...recordInState,
        ...record,
      };
    });

    this.setState({ data: updatedData });
  };

  handleTableAction = (caller, data) => {
    // eslint-ignore-next-line no-console
    console.log(`Action: '${caller.name}' has been invoked:`);
    // eslint-ignore-next-line no-console
    console.table(data);

    switch (caller.name) {
      case 'edit.save':
        this.handleRecordUpdate(data);
        break;

      default:
    }
  };

  render() {
    const { columns, data, display } = this.state;
    const actions = {
      modules: [
        {
          module: 'button',
          name: 'test',
        },
        {
          module: 'button',
          name: 'stuff',
        },
        {
          module: 'button',
          name: 'okay',
        },
        {
          content: 'View FAQ',
          module: 'button',
          name: 'view.faq',
        },
        {
          content: 'edit',
          module: 'edit',
          name: 'edit',
        },
      ],
    };
    const dataConfig = {
      actionButtonMenuIndex: 0,

      display,
    };

    const availableColumns = columns.map((columnDef) => ({
      key: columnDef.attribute,
      text: columnDef.content,
      value: columnDef.attribute,
    }));

    const selectedColumns = display.map((columnDef) => columnDef.attribute);

    return (
      <>
        <JsonPlaceholder data={dataConfig} title='dataConfig' />
        <JsonPlaceholder
          data={{ availableColumns, selectedColumns }}
          title='available vs. selected columns'
        />
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
          actions={actions}
          data={data}
          dataConfig={dataConfig}
          onAction={this.handleTableAction}
          uniqueIdAttribute={'eid'}
        />
      </>
    );
  }
}

export default Fixture;
