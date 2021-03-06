import React, { PureComponent } from 'react';
import { Dropdown, Header } from 'semantic-ui-react';

import JsonPlaceholder from '../../../placeholders/JsonPlaceholder';

import { generateFakeInteractions } from '../../../lib/mock/fakeData';
import Table from '..';

const defaultColumns = [
  {
    attribute: 'created',
    content: 'Created',
    isEditable: true,
    isLabeled: false,
    module: 'text',
  },
  {
    attribute: 'phrase',
    content: 'Phrase',
    isEditable: false,
    isLabeled: false,
    module: 'text',
  },
  {
    attribute: 'user',
    content: 'User',
    isEditable: true,
    isLabeled: false,
    module: 'email',
  },
  {
    attribute: 'response',
    content: 'Response',
    isEditable: true,
    isLabeled: false,
    module: 'checkbox',
  },
  {
    attribute: 'deflected',
    content: 'Deflected',
    isEditable: true,
    isLabeled: false,
    module: 'checkbox',
  },
  {
    attribute: 'matchedIntent',
    content: 'Matched Intent',
    isEditable: true,
    isLabeled: false,
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
        break;
    }
  };

  resolveRecordActions = (record, actions) => {
    return actions.reduce((actions, action) => {
      switch (action.name) {
        case 'view.faq':
          if (record.type === 'faq') {
            actions.push(action);
          }
          break;

        default:
          actions.push(action);
          break;
      }

      return actions;
    }, []);
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
      resolveRecordActions: this.resolveRecordActions,
    };
    const dataConfig = {
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
        <JsonPlaceholder data={actions} title='actions' />
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
