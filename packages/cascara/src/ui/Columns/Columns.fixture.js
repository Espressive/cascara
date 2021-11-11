import React from 'react';

import Columns from '.';

export default {
  withDefaultProps: (
    <>
      <p>
        This example shows the columns component without a `count` prop. That
        is, with default props.
      </p>
      <Columns>
        <div>Column 1</div>
        <div>Column 2</div>
      </Columns>
    </>
  ),
  withThreeColumns: (
    <>
      <p>
        This example shows the columns component with the <b>count</b> prop set
        to 3.
        <br />
        Please note that the number of children must be equal to the{' '}
        <b>count</b> prop, otherwise it will break the layout.
      </p>
      <Columns count={3}>
        <div>Column 1</div>
        <div>Column 2</div>
        <div>Column 3</div>
      </Columns>
    </>
  ),
};
