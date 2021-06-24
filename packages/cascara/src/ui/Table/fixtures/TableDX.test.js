import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import cosmosFixtures, { results } from './TableDX.fixture';

const { 'Data Only': dataOnly } = cosmosFixtures;
const RESULTS_KEYS = Object.keys(results[0]);

describe('Table DX', () => {
  test.todo(`should show a loading state if the 'data' prop is 'undefined'`);

  describe(`should render all 'data' into columns if no other props are defined:`, () => {
    // We need to call the fixture function in order to correctly render it.
    beforeEach(() => {
      render(dataOnly());
    });

    test(`all table headers`, () => {
      const tableHeader = within(
        screen.getByText(RESULTS_KEYS[0]).closest('tr')
      );
      RESULTS_KEYS.forEach((key) => {
        expect(tableHeader.getByText(key)).toBeInTheDocument();
      });
    });

    test(`all rows render`, () => {
      // Test only within the table body, since there are also
      // rows and cells in the table header
      const tableBody = within(
        screen.getByRole('table').querySelector('tbody')
      );

      const rows = tableBody.getAllByRole('row');

      // Check that we have the correct number of rows
      expect(rows).toHaveLength(results.length);
      // Check that we have the correct number of cells in each row
      rows.forEach((row) =>
        expect(within(row).getAllByRole('cell')).toHaveLength(
          RESULTS_KEYS.length
        )
      );
    });
  });

  test.todo(
    `should render 'data' from 'dataDisplay' configured settings with no other props defined`
  );
});
