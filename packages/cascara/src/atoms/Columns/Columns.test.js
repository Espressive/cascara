import React from 'react';
import { render } from '@testing-library/react';

import fixtures from './Columns.fixture';
import Columns from './Columns';

describe('<Columns />', () => {
  // run snapshot test for all fixtures.
  test('snapshot tests', async () => {
    for (const fixture in fixtures) {
      const view = render(fixtures[fixture]).container;

      expect(view).toMatchSnapshot();
    }
  });

  // this test expands the number of columns to 10.
  test('snapshot tests n', async () => {
    for (let columnsCount = 3; columnsCount < 11; columnsCount++) {
      const content = Array(columnsCount)
        .fill(1, 0)
        .map((_, idx) => (
          <div key={`Column ${idx + 1}`}>{`Column ${idx + 1}`}</div>
        ));

      const view = render(
        <Columns count={columnsCount}>{content}</Columns>
      ).container;

      expect(view).toMatchSnapshot();
    }
  });
});
