import React from 'react';

import Table from '../Table';
import { Flex, Title } from '../../../';
import { results as fixtureData } from '../data/entities';

import { ACTIONS, COLUMNS } from './__config';

const DataWithDisplay = (fixtureProps) => (
  <>
    <Title title='Data With dataDisplay' />
    <p>
      Developers should be able to pass a minimal dataDisplay config to narrow
      the fields that they want to show in the Table. There should be no need
      for setting up dependant props for this to work.
    </p>
    <Flex>
      <div>
        <p>
          No unique identifier is being set so we are inferring it based on data
          keys in this order:
        </p>
        <ol>
          <li>eid</li>
          <li>uuid</li>
          <li>id</li>
          <li>sys_date_created</li>
        </ol>
      </div>
      <div>
        <p>These are the only columns that should be showing:</p>
        <ul>
          {COLUMNS.map(({ label }) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
      </div>
    </Flex>
    <Table {...fixtureProps} />
  </>
);

const UnknownActionModules = (fixtureProps) => (
  <>
    <Title title='actions.modules with unknown modules' />
    <p>
      A helpful error message is displayed if an action module is not found.
    </p>

    <Table {...fixtureProps} />
  </>
);

const UnknownDataModules = (fixtureProps) => (
  <>
    <Title title='dataDisplay with unknown modules' />
    <p>A helpful error message is displayed if a data module is not found.</p>

    <Table {...fixtureProps} />
  </>
);

// const WithDeprecatedProps = ({ onAction: extOnAction, ...props } = {}) => {
//   const onAction = useCallback((action, record) => {
//     console.log(`Action ${action.name} invoked`);

//     switch (action.name) {
//       case 'viewInFAQ':
//         console.table(record);
//         break;

//       case 'edit.start':
//         // do something
//         break;

//       case 'edit.cancel':
//         // do something
//         break;

//       case 'edit.save':
//         // do something
//         break;

//       default:
//         break;
//     }
//   }, []);

//   return (
//     <>
//       <h3>With deprecated props</h3>
//       <p>
//         Some props have been deprecated, this is a safeguard for developerss
//       </p>

//       <Table {...props} onAction={extOnAction || onAction} />
//     </>
//   );
// };

export default {
  dataWithDisplay: <DataWithDisplay data={fixtureData} dataDisplay={COLUMNS} />,
  unknownActionModule: (
    <UnknownActionModules
      actions={{
        ...ACTIONS,
        modules: [
          ...ACTIONS.modules,
          {
            module: 'tequila',
          },
        ],
      }}
      data={fixtureData}
      dataDisplay={COLUMNS}
    />
  ),
  unknownDataModule: (
    <UnknownDataModules
      actions={ACTIONS}
      data={fixtureData}
      dataDisplay={[...COLUMNS, { attribute: 'eid', module: 'unknownModule' }]}
    />
  ),
};
