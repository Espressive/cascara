import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import cosmosFixtures, { dataResults } from './TableDX.fixture';

const { 'Data Only': dataOnly } = cosmosFixtures;
const RESULTS_KEYS = Object.keys(dataResults[0]);

describe('Table DX', () => {
  test.todo(`should show a loading state if the 'data' prop is 'undefined'`);

  describe(`should render all 'data' into columns if no other props are defined:`, () => {
    beforeEach(() => {
      // We need to call the fixture function in order to correctly render it.
      render(dataOnly());
    });

    test(`all table headers`, () => {
      // Search for the text in the first header column and get the row, which is the table header
      const tableHeader = within(
        screen.getByText(RESULTS_KEYS[0]).closest('tr')
      );

      // Expect each header in the results keys is rendered in the document
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

      // get all of the rows in the table body
      const rows = tableBody.getAllByRole('row');

      // Expect that we have rendered the same number of rows as we have data results
      expect(rows).toHaveLength(dataResults.length);
      // Expect that we have the same number of cells in each row as we have keys in our data objects
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
