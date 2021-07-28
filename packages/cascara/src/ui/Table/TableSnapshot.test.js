import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'reakit';
import 'mutationobserver-shim';

import Table from '.';
import { generateFakeEmployees } from '../../lib/mock/fakeData';

// NOTE: Tests for loading, empty, and early/simple configuration state are in TableDX

describe('Table - Snapshots', () => {
  // Component tree
  // This test suite addresses the very basics of testing the Table UI.
  //
  // The first test is the snapshot, nothing special.
  //
  // Table actions
  // An extra column is appended if any or both of these are true:
  //
  // a) at least one `action` is specified in `dataConfig.actions` array
  // b) at least one column in the `dataConfig.display` array is editable
  //
  // In either cases, the extra column displays the action modules.
  //
  // The test `row actions` corresponds to condition a, whilst the test
  // `editable records` addresses condition b.
  describe('component tree', () => {
    const datasetSize = 5;
    const data = generateFakeEmployees(datasetSize);
    const actions = {
      actionButtonMenuIndex: 2,
      modules: [
        {
          content: 'view',
          isLabeled: false,
          module: 'button',
          name: 'view',
          size: 'small',
        },
        {
          content: 'delete',
          isLabeled: false,
          module: 'button',
          name: 'delete',
          size: 'small',
        },
        {
          cancelLabel: 'Cancel',
          content: 'edit',
          isLabeled: false,
          module: 'edit',
          name: 'edit',
          saveLabel: 'Save',
          size: 'small',
        },
      ],
    };

    const dataDisplay = [
      {
        attribute: 'active',
        isEditable: true,
        label: 'Active',
        module: 'checkbox',
      },
      {
        attribute: 'eid',
        isEditable: false,
        label: 'ID',
        module: 'text',
      },
      {
        attribute: 'email',
        isEditable: true,
        label: 'Email',
        module: 'email',
      },
      {
        attribute: 'country',
        isEditable: true,
        label: 'Country',
        module: 'select',
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
    ];

    test('snapshot test', () => {
      const view = render(
        <Provider>
          <Table
            actions={actions}
            data={data}
            dataDisplay={dataDisplay}
            uniqueIdAttribute={'eid'}
          />
        </Provider>
      ).container;

      expect(view).toMatchSnapshot();
    });

    test('without row actions', () => {
      const view = render(
        <Provider>
          <Table
            actions={actions}
            data={data}
            dataDisplay={dataDisplay}
            uniqueIdAttribute={'eid'}
          />
        </Provider>
      ).container;

      expect(view).toMatchSnapshot();
    });
  });
});
