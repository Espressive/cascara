import React from 'react';
import { render } from '@testing-library/react';

import ActionBar from './ActionBar';
import ActionButton from '../../modules/ActionButton';

const ACTION_MODULES = {
  button: ActionButton,
};

describe('ActionBar', () => {
  /**
   *
   */
  describe('component tree', () => {
    const actions = [
      {
        'data-testid': 'new',
        isLabeled: false,
        label: 'new',
        module: 'button',
        name: 'new',
        size: 'small',
      },
      {
        'data-testid': 'edit',
        isLabeled: false,
        label: 'edit',
        module: 'button',
        name: 'edit',
        size: 'small',
      },
    ].map((action) => {
      const { module, ...rest } = action;
      const Action = ACTION_MODULES[module];

      /**
       * In certain predefined-action modules in which a label is not required, e.g. `edit`,
       * the following unique key generation fails, as it relies on the label (content).
       */
      const key = `${module}.${rest.label || module}`;

      return <Action key={key} {...rest} />;
    });
    let view;

    test('snapshot', () => {
      view = render(<ActionBar actions={actions} title={'Espressive'} />)
        .container;

      expect(view).toMatchSnapshot();
    });

    test('default props', () => {
      view = render(<ActionBar />).container;

      expect(view).toMatchSnapshot();
    });
  });
});
