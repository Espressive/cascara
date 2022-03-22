import { render, screen, within } from '@testing-library/react';
import 'mutationobserver-shim';

import cosmosFixtures from '../fixtures/Sorting.fixture';

const {
  allAttributesSort,
  arbitraryAttributesSort,
  singleAttributesSort,
  withInitialSortConfig,
} = cosmosFixtures;

describe('Table Sort', () => {
  test('all attributes sort: sorting -> Boolean', () => {
    render(allAttributesSort);

    const table = within(screen.getByRole('table'));
    const tableHeaders = table.getAllByRole('columnheader');

    /**
     * A table with a sorting prop of Boolean type will cause
     * all columns to be sortable.
     *
     * This test makes sure all headers, except the selection header, have a
     * SortArrow class. Indicative of a column that can be sorted.
     */
    tableHeaders.forEach((tableHeader) => {
      const headerCells = within(tableHeader).findAllByRole('div');

      if (headerCells.length) {
        headerCells.forEach((cell) => {
          // eslint-disable-next-line jest/no-conditional-expect -- we need to skip the selection header
          expect(cell.classList).toHaveProperty('SortArrow');
        });
      }
    });
  });

  test('arbitrary attribute sort: sorting -> Array[String]', () => {
    render(arbitraryAttributesSort);

    const table = within(screen.getByRole('table'));
    const tableHeaders = table.getAllByRole('columnheader');

    /**
     * A table with a sorting prop of Array[String] type that specifies attributes will cause
     * the columns for such attributes to be sortable. The fixture specifies eid and name as sortable.
     * This test makes sure that those specific headers have a SortArrow class, indicative of a column that can be sorted.
     */
    tableHeaders.forEach((tableHeader, index) => {
      const sortableIndexes = [1, 2];
      const headerCells = within(tableHeader).findAllByRole('div');

      if (headerCells.length && sortableIndexes.includes(index)) {
        headerCells.forEach((cell) => {
          // eslint-disable-next-line jest/no-conditional-expect -- we need to check a specific header
          expect(cell.classList).toHaveProperty('SortArrow');
        });
      }
    });
  });

  test('single attribute sort - sorting -> String', () => {
    render(singleAttributesSort);

    const table = within(screen.getByRole('table'));
    const tableHeaders = table.getAllByRole('columnheader');

    /**
     * A table with a sorting prop of Array[String] type that specifies attributes will cause
     * the columns for such attributes to be sortable. The fixture specifies eid and name as sortable.
     * This test makes sure that those specific headers have a SortArrow class, indicative of a column that can be sorted.
     */
    tableHeaders.forEach((tableHeader, index) => {
      const sortableIndexes = [1];
      const headerCells = within(tableHeader).findAllByRole('div');

      if (headerCells.length && sortableIndexes.includes(index)) {
        headerCells.forEach((cell) => {
          // eslint-disable-next-line jest/no-conditional-expect -- we need to check a specific header
          expect(cell.classList).toHaveProperty('SortArrow');
        });
      }
    });
  });

  test('with initial sorting config', () => {
    render(withInitialSortConfig);

    const table = within(screen.getByRole('table'));
    const tableHeaders = table.getAllByRole('columnheader');

    /**
     * A table with an initialSort prop will apply such configuration.
     * This test makes sure the initialSort is applied.
     */
    tableHeaders.forEach((tableHeader, index) => {
      const sortableIndexes = [1];
      const headerCells = within(tableHeader).findAllByRole('div');

      if (headerCells.length && sortableIndexes.includes(index)) {
        headerCells.forEach((cell) => {
          // eslint-disable-next-line jest/no-conditional-expect -- we need to check a specific header
          expect(cell.classList).toHaveProperty('SortArrow');
          // eslint-disable-next-line jest/no-conditional-expect -- we need to check a specific header
          expect(cell.classList).toHaveProperty('SortArrowDown');
        });
      }
    });
  });
});
