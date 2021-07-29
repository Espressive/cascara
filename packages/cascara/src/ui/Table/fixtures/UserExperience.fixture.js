// eslint-disable-next-line eslint-comments/disable-enable-pair -- we need this for the one below
/* eslint-disable react/display-name  -- for testing, we need to allow props down the stream */
import React, { useCallback } from 'react';
import { Provider } from 'reakit';

import Table from '../Table';
import { results } from '../data/entities';
import { ACTIONS, COLUMNS } from './constants';

const Loading = () => (
  <>
    <h3>Loading</h3>
    <p>
      The table component will not blow up if there are no values defined. It
      will also explicitly show a loading state if the data attribute is
      undefined (or null).
    </p>

    <Table />
  </>
);

const Empty = (fixtureProps) => (
  <>
    <h3>Empty</h3>
    <p>
      If a table gets an empty array, that should be treated different from
      undefined or null. An empty array should mean that there are no records
      and we should indicate this to users in the table itself.
    </p>

    <Table {...fixtureProps} />
  </>
);

const DataOnly = (fixtureProps) => (
  <>
    <h3>Data Only</h3>
    <p>
      When only passing an array of data results to a Table, we should render
      all results, even if no other props are defined yet. We should also
      attempt to infer the correct module type to display. This includes tricky
      types like object and array using a private module for JSON.
    </p>

    <Table {...fixtureProps} />
  </>
);

const WithActions = ({
  actions,
  onAction: extOnAction,
  isOnAction,
  ...props
}) => {
  const onAction = useCallback((action, record) => {
    console.log(`Action ${action.name} invoked`);

    switch (action.name) {
      case 'viewInFAQ':
        console.table(record);
        break;

      case 'edit.start':
        // do something
        break;

      case 'edit.cancel':
        // do something
        break;

      case 'edit.save':
        // do something
        break;

      default:
        break;
    }
  }, []);

  return (
    <>
      <h3>With {isOnAction ? 'onAction' : 'actions'}</h3>
      <p>
        {isOnAction
          ? 'The onAction event fires when a button is clicked'
          : 'Actions can be added to each row, if any actions are passed, the onAction prop must also be passed.'}
      </p>

      <p>open your console!</p>
      <Table {...props} actions={actions} onAction={extOnAction || onAction} />
    </>
  );
};

const WithoutActionBar = ({ actions, onAction: extOnAction, ...props }) => {
  const onAction = useCallback((action, record) => {
    console.log(`Action ${action.name} invoked`);

    switch (action.name) {
      case 'viewInFAQ':
        console.table(record);
        break;

      case 'edit.start':
        // do something
        break;

      case 'edit.cancel':
        // do something
        break;

      case 'edit.save':
        // do something
        break;

      default:
        break;
    }
  }, []);

  return (
    <>
      <h3>Without action bar</h3>
      <p>
        By default, actions are grouped inside an ActionBar to save space, this
        behavior can be controlled by the <code>actionButtonMenuIndex</code>{' '}
        prop
      </p>

      <Table {...props} actions={actions} onAction={extOnAction || onAction} />
    </>
  );
};

const ConditionalActions = ({ actions, onAction: extOnAction, ...props }) => {
  const onAction = useCallback((action, record) => {
    console.log(`Action ${action.name} invoked`);

    switch (action.name) {
      case 'viewInFAQ':
        console.table(record);
        break;

      case 'edit.start':
        // do something
        break;

      case 'edit.cancel':
        // do something
        break;

      case 'edit.save':
        // do something
        break;

      default:
        break;
    }
  }, []);

  const resolveRecordActions = useCallback(
    (record, actions) =>
      actions.reduce((actionsForRecord, action) => {
        switch (action.name) {
          case 'edit':
            // row is not editable if record is deflected
            if (!record.deflected) {
              actionsForRecord.push(action);
            }
            break;

          case 'viewInFAQ':
            // row is not visitable if hide_in_faq is true
            if (!record.hide_in_faq) {
              actionsForRecord.push(action);
            }
            break;

          default:
            actionsForRecord.push(action);
        }

        return actionsForRecord;
      }, []),
    []
  );

  const conditionalActions = {
    ...actions,
    resolveRecordActions,
  };

  return (
    <>
      <h3>Conditional Actions</h3>
      <p>
        Actions can be conditionally displayed in rows. For the purposes of this
        example, the <code>View</code> action will only show for entities (rows)
        whose <code>hide_in_faq</code> property is set to <code>false</code>.
        (click View and see the console)
      </p>

      <Table
        {...props}
        actions={conditionalActions}
        onAction={extOnAction || onAction}
      />
    </>
  );
};

const WithoutActions = (props) => {
  return (
    <>
      <h3>Without Actions</h3>
      <p>
        The table component will not display any buttons if no actions are
        passed.
      </p>

      <Table {...props} />
    </>
  );
};

// We export the data results here for use in our tests.
// This also allows us to generate test data from inside a fixture and then reuse it in tests.
const dataResults = results;
export { dataResults };

export default {
  loading: <Loading />,
  empty: <Empty data={[]} uniqueIdAttribute='eid' />,
  dataOnly: <DataOnly data={results} uniqueIdAttribute='eid' />,
  conditionalActions: (
    <Provider>
      <ConditionalActions
        actions={ACTIONS}
        data={results}
        dataDisplay={COLUMNS}
        uniqueIdAttribute='eid'
      />
    </Provider>
  ),
  withActions: (
    <Provider>
      <WithActions
        actions={ACTIONS}
        data={results}
        dataDisplay={COLUMNS}
        uniqueIdAttribute='eid'
      />
    </Provider>
  ),
  withoutActionBar: (props) => (
    <Provider>
      <WithoutActionBar
        actions={{
          ...ACTIONS,
          actionButtonMenuIndex: 100,
        }}
        data={results}
        dataDisplay={COLUMNS}
        uniqueIdAttribute='eid'
        {...props}
      />
    </Provider>
  ),
  withOnAction: (props) => (
    <Provider>
      <WithActions
        actions={ACTIONS}
        data={results}
        dataDisplay={COLUMNS}
        isOnAction
        uniqueIdAttribute='eid'
        {...props}
      />
    </Provider>
  ),
  withoutActions: (
    <Provider>
      <WithoutActions
        data={results}
        dataDisplay={COLUMNS}
        uniqueIdAttribute='eid'
      />
    </Provider>
  ),
};
