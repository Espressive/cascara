import React from 'react';

import JsonPlaceholder from '../../../placeholders/JsonPlaceholder';
import Table from '..';

const Fixture = () => (
  <>
    <h3>Empty Table</h3>
    <p>
      In this example, Table does not render anything, since there is no data.
      This can also happen if no columns are defined.
      <br />
      If either Data nor Colums are defined, it is assumed that we do not want
      to display a Table at the moment.
    </p>

    <JsonPlaceholder data={null} title='props' />
    <Table />
  </>
);

export default Fixture;
