import React from 'react';

import Table from '../Table';
import { Flex, Title } from '../../../';
import { results as FIXTURE_DATA } from '../data/entities';

import { ACTIONS, COLUMNS } from './__config';

const DataWithDisplay = (fixtureProps) => (
  <>
    <Title title='Data With Display' />
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

const DataWithActions = (fixtureProps) => (
  <>
    <Title title='Data With Actions' />
    <p>
      Data can be presetned with action objects which will show up on each row.
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

export default {
  dataWithDisplay: (
    <DataWithDisplay data={FIXTURE_DATA} dataDisplay={COLUMNS} />
  ),
  dataWithActions: (
    <DataWithActions
      actions={ACTIONS}
      data={FIXTURE_DATA}
      dataDisplay={COLUMNS}
    />
  ),
  unknownDataModule: (
    <UnknownDataModules
      actions={ACTIONS}
      data={FIXTURE_DATA}
      dataDisplay={[...COLUMNS, { attribute: 'eid', module: 'unknownModule' }]}
    />
  ),
};
