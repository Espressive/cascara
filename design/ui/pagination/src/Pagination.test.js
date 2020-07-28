import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

/**
 * We import the fixture to save us from the setup hassle,
 * the fixture contains everything we need for testing
 * the component */
import { Wrapper } from './Pagination.fixture';

describe('Espressive UI Pagination', () => {
  afterEach(cleanup);

  test('Renders with defaults', () => {
    const snap = render(<Wrapper />).container;

    expect(snap).toMatchSnapshot();

    // This should always be our first test rendering the bare component.
    // We might need to find a way to make this test not fail for a prop-type
    // error if there are missing required props. Eventually we want tests
    // to fail if there are any console errors.
  });

  test('it renders!', () => {
    const { queryAllByText, getAllByRole } = render(<Wrapper />);

    // The test dataset contains 500 items
    const headers = queryAllByText('500 Total (Displaying 1 - 10)');

    // Default props are 1 and 10 for page and limit,
    // display range is from 1 to 10, because we are in page 1

    const dropdowns = getAllByRole('listbox');
    const buttons = getAllByRole('button');

    // header and footer the same, hence expecting 2
    expect(headers).toHaveLength(2);

    // same with buttons, there are two groups of 2
    expect(dropdowns).toHaveLength(4);
    expect(buttons).toHaveLength(4);
  });

  test('it paginates via navigation buttons', async () => {
    const { container, queryAllByText } = render(<Wrapper />);

    const backButton = container.querySelector('.headerBackButton');
    const frwdButton = container.querySelector('.headerFrwdButton');

    fireEvent.click(frwdButton, { target: { name: 'forward' } });
    let subheaders = queryAllByText('(Displaying 11 - 20)');
    expect(subheaders).toHaveLength(2);

    fireEvent.click(backButton, { target: { name: 'backward' } });
    subheaders = queryAllByText('(Displaying 1 - 10)');
    expect(subheaders).toHaveLength(2);
  });

  test('it paginates via items per page dropdown', async () => {
    const { getAllByText, queryAllByText } = render(<Wrapper />);

    fireEvent.click(getAllByText('75')[0]);

    const subheaders = queryAllByText('(Displaying 1 - 75)');
    expect(subheaders).toHaveLength(2);
  });

  test('it safely resets to page 1 when All items are dispayed', async () => {
    const { getAllByText, queryAllByText } = render(<Wrapper />);

    fireEvent.click(getAllByText('All')[0]);

    const subheaders = queryAllByText('(Displaying 1 - 500)');
    expect(subheaders).toHaveLength(2);
  });

  test('it correctly dispays entity name in singular form', async () => {
    const { queryAllByText } = render(
      <Wrapper
        entityNamePlural='emails'
        entityNameSingular='email'
        /**
         * We are cheating here, we need to pretend there's only 1 item
         * in order to test the singular form. */
        totalItems={1}
      />
    );

    const subheaders = queryAllByText('1 email');
    expect(subheaders).toHaveLength(2);
  });

  test('it correctly dispays entity name in plural form', async () => {
    const { queryAllByText } = render(
      <Wrapper entityNamePlural='emails' entityNameSingular='email' />
    );

    const subheaders = queryAllByText('500 emails');
    expect(subheaders).toHaveLength(2);
  });
});
