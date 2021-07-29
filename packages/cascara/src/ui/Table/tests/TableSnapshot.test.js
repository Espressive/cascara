import { render, within } from '@testing-library/react';
import 'mutationobserver-shim';

import cosmosDXFixtures from '../fixtures/TableDX.fixture';
import cosmosUXFixtures from '../fixtures/TableUX.fixture';

const {
  conditionalActions,
  withActions,
  withDeprecatedProps,
  withoutActions,
  withoutActionBar,
} = cosmosUXFixtures;

const { loading, empty, unknownActionModule, unknownDataModule } =
  cosmosDXFixtures;
// NOTE: Tests for loading, empty, and early/simple configuration state are in TableDX

describe('Table', () => {
  describe('snapshot tests', () => {
    test(`should show a loading state if the 'data' prop is 'undefined' or 'null'`, () => {
      const { baseElement } = render(loading);
      // This technically captures the entire fixture in a snapshot. We should consider if we want to only select the element within for a snapshot or not.
      // update: by default, snapshots are wrapped by a `<body>` tag, which doesn't cause snapshots to grow signigicantly
      expect(baseElement).toMatchSnapshot();
    });

    test(`should show an empty state if data is defined but has a length of 0`, () => {
      const { baseElement } = render(empty);
      expect(baseElement).toMatchSnapshot();
    });

    test('conditional actions', () => {
      const { baseElement } = render(conditionalActions);
      const [, tbody] = within(baseElement).getAllByRole('rowgroup');
      const [firstRow] = within(tbody).getAllByRole('row');

      expect(firstRow).toMatchSnapshot();
    });

    test('without actions', () => {
      const { baseElement } = render(withoutActions);

      const [, tbody] = within(baseElement).getAllByRole('rowgroup');
      const [firstRow] = within(tbody).getAllByRole('row');

      expect(firstRow).toMatchSnapshot();
    });

    test('with actions', () => {
      const { baseElement } = render(withActions);

      const [, tbody] = within(baseElement).getAllByRole('rowgroup');
      const [firstRow] = within(tbody).getAllByRole('row');

      expect(firstRow).toMatchSnapshot();
    });

    test('with deprecated props', () => {
      const { baseElement } = render(withDeprecatedProps);

      const [, tbody] = within(baseElement).getAllByRole('rowgroup');
      const [firstRow] = within(tbody).getAllByRole('row');

      expect(firstRow).toMatchSnapshot();
    });

    test('actions with non-existent module', () => {
      const { baseElement } = render(unknownActionModule);

      const [, tbody] = within(baseElement).getAllByRole('rowgroup');
      const [firstRow] = within(tbody).getAllByRole('row');

      expect(firstRow).toMatchSnapshot();
    });

    test('dataDisplay with non-existent module', () => {
      const { baseElement } = render(unknownDataModule);

      const [, tbody] = within(baseElement).getAllByRole('rowgroup');
      const [firstRow] = within(tbody).getAllByRole('row');

      expect(firstRow).toMatchSnapshot();
    });

    test('without <ActionBar />', () => {
      const { baseElement } = render(withoutActionBar);

      const [, tbody] = within(baseElement).getAllByRole('rowgroup');
      const [firstRow] = within(tbody).getAllByRole('row');

      expect(firstRow).toMatchSnapshot();
    });
  });
});
