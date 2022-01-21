import { render } from '@testing-library/react';

import fixtures from './Stat.fixture';

describe('stat', () => {
  //Run snapshot test for all fixtures
  test('snapshot tests', async () => {
    for (const fixture in fixtures) {
      const view = render(fixtures[fixture]).container;

      expect(view).toMatchSnapshot();
    }
  });
});
