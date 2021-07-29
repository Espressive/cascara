// eslint-disable-next-line eslint-comments/disable-enable-pair -- we need this for the one below
/* eslint-disable react/display-name  -- for testing, we need to allow props down the stream */
import React, { useCallback } from 'react';
import { Provider } from 'reakit';

import Table from '../Table';
import { results } from '../data/entities';
import { ACTIONS, COLUMNS } from './constants';

const WithDeprecatedProps = ({
  actions = [],
  onAction: extOnAction,
  ...props
} = {}) => {
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
      <h3>With deprecated props</h3>
      <p>
        Some props have been deprecated, this is a safeguard for developerss
      </p>

      <Table
        {...props}
        dataConfig={{
          actions: [...ACTIONS.modules, ...actions],
          display: COLUMNS,
        }}
        onAction={extOnAction || onAction}
      />
    </>
  );
};

const WithActions = ({ actions, onAction: extOnAction, ...props }) => {
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
      <h3>With Actions</h3>
      <p>
        Actions can be added to each row, if any actions are passed, the{' '}
        <code>onAction</code> prop must also be passed.
      </p>

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
  withoutActionBar: (
    <Provider>
      <WithoutActionBar
        actions={{
          ...ACTIONS,
          actionButtonMenuIndex: 100,
        }}
        data={results}
        dataDisplay={COLUMNS}
        uniqueIdAttribute='eid'
      />
    </Provider>
  ),
  withActionsOnAction: (props) => (
    <Provider>
      <WithActions
        actions={ACTIONS}
        data={results}
        dataDisplay={COLUMNS}
        uniqueIdAttribute='eid'
        {...props}
      />
    </Provider>
  ),
  withDeprecatedProps: (
    <Provider>
      <WithDeprecatedProps data={results} uniqueIdAttribute='eid' />
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
