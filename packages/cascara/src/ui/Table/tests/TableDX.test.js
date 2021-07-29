import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import cosmosDXFixtures, { dataResults } from '../fixtures/TableDX.fixture';
import cosmosUXFixtures from '../fixtures/TableUX.fixture';
import { COLUMNS } from '../fixtures/constants';

const { dataOnly, dataWithDisplay } = cosmosDXFixtures;
const { withDeprecatedProps } = cosmosUXFixtures;

const RESULTS_KEYS = Object.keys(dataResults[0]);

describe('Table DX', () => {
  describe(`should render all 'data' into columns if no other props are defined:`, () => {
    test(`all table headers`, () => {
      render(dataOnly);
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
      render(dataOnly);
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

  test(`should render 'data' from 'dataDisplay' configured settings with no other props defined`, () => {
    render(dataWithDisplay);

    // Check to make sure we only have the number of columns as defined in dataDisplay.
    // This is only checking column headers, not every row.
    expect(screen.getAllByRole('columnheader')).toHaveLength(
      dataWithDisplay.props.dataDisplay.length
    );
  });

  // FDS-164: table header not adding an extra column for actions
  test("deprecated dataConfig.actions prop doesn't break header number of columns", () => {
    render(withDeprecatedProps);

    const renderedCells = screen.getAllByRole('cell');
    const expectedCells = (COLUMNS.length + 1) * dataResults.length;

    expect(renderedCells).toHaveLength(expectedCells);
  });
});
