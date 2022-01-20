import React from 'react';
import { render, screen } from '@testing-library/react';

import Rule from './Rule';

describe('<Rule />', () => {
  // Runs a snapshot test for the minimum required props
  test('empty snapshot', async () => {
    const view = render(
      <Rule body='Required Body' title='Required Title' />
    ).container;
    expect(view).toMatchSnapshot();
  });

  // Snapshot test to validate image presentation AND accessibility
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
