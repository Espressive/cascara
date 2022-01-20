import React from 'react';
import { render, screen } from '@testing-library/react';

import Rule from './Rule';

describe('<Rule />', () => {
  // run snapshot test for all fixtures.
  test('empty snapshot', async () => {
    const view = render(
      <Rule body='Required Body' title='Required Title' />
    ).container;
    expect(view).toMatchSnapshot();
  });

  test('renders accessible images', async () => {
    const ruleTitle = 'My Rule';
    const ruleImageSrc = 'https://placedog.net/500/500';

    const view = render(
      <Rule
        body='Required body'
        doImg={ruleImageSrc}
        dontImg={ruleImageSrc}
        title={ruleTitle}
      />
    );
    expect(view).toMatchSnapshot();
    expect(
      screen.getByAltText(`Incorrect usage example for: ${ruleTitle}`)
    ).toBeVisible();
    expect(
      screen.getByAltText(`Correct usage example for: ${ruleTitle}`)
    ).toBeVisible();
  });
});
