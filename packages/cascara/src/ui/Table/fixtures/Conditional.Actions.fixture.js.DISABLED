import React, { PureComponent } from 'react';
import { Dropdown } from 'semantic-ui-react';

import JsonPlaceholder from '../../../placeholders/JsonPlaceholder';

import { generateFakeInteractions } from '../../../lib/mock/fakeData';
import Table from '..';

const defaultColumns = [
  {
    attribute: 'created',
    isEditable: true,
    label: 'Created',
    module: 'text',
  },
  {
    attribute: 'phrase',
    isEditable: false,
    label: 'Phrase',
    module: 'text',
  },
  {
    attribute: 'user',
    isEditable: true,
    label: 'User',
    module: 'email',
  },
  {
    attribute: 'response',
    isEditable: true,
    label: 'Response',
    module: 'checkbox',
  },
  {
    attribute: 'deflected',
    isEditable: true,
    label: 'Deflected',
    module: 'checkbox',
  },
  {
    attribute: 'matchedIntent',
    isEditable: true,
    label: 'Matched Intent',
    module: 'text',
  },

  {
    attribute: 'type',
    isEditable: true,
    label: 'Type',
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

  resolveRecordActions(record, actions) {
    return actions.reduce((actionsForRecord, action) => {
      switch (action.name) {
        //
        // Idealy, Cascara actions would always go first
        // because they go outside the ActionsMenu.
        //
        // Since that is something we cannot control, we
        // will have to filter them out inside Cascara.
        case 'edit':
          // do not show if record is deflected
          if (!record.deflected) {
            actionsForRecord.push(action);
          }
          break;

        case 'view.faq':
          // do not show view button for FAQs
          if (record.type !== 'faq') {
            actionsForRecord.push(action);
          }
          break;

        default:
          actionsForRecord.push(action);
      }

      return actionsForRecord;
    }, []);
  }

  render() {
    const { columns, data, display } = this.state;
    const dataConfig = {
      actionButtonMenuIndex: 0,
      actions: [
        {
          content: 'test',
          module: 'button',
          name: 'test',
        },
        {
          content: 'stuff',
          module: 'button',
          name: 'stuff',
        },
        {
          content: 'okay',
          module: 'button',
          name: 'okay',
        },
        {
          content: 'View FAQ',
          module: 'button',
          name: 'view.faq',
        },
        {
          module: 'edit',
          name: 'edit',
        },
      ],
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
        <h4 className='ui header'>
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
        </h4>

        <Table
          data={data}
          dataConfig={dataConfig}
          onAction={this.handleTableAction}
          resolveRecordActions={this.resolveRecordActions}
          uniqueIdAttribute={'eid'}
        />
      </>
    );
  }
}

export default <Fixture />;
