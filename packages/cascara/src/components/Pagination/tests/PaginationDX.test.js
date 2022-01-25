import { render, screen } from '@testing-library/react';
import fixtures from '../Pagination.fixture';
import { LABELS } from '../__globals';

const getControls = () => {
  // Get all of our button controls
  const buttons = screen.getAllByRole('button');
  // Get all of our select controls
  const comboboxes = screen.getAllByRole('combobox');

  const recordCount = screen.queryByLabelText(LABELS.RECORD_COUNT);
  const currentRecords = screen.queryByLabelText(LABELS.CURRENT_RECORDS);

  return {
    buttons,
    comboboxes,
    currentRecords,
    recordCount,
  };
};

const { totalRecordCountNoState, empty, loading } = fixtures;

describe('PaginationDX', () => {
  test('loading', () => {
    render(loading);

    const { buttons, comboboxes, recordCount, currentRecords } = getControls();

    // Make sure all controls are disabled
    [...buttons, ...comboboxes].forEach((el) => expect(el).toBeDisabled());
    // Make sure each button is also in a loading state
    buttons.forEach((el) =>
      expect(el.classList.contains('loading')).toBeTruthy()
    );
    // We should not try to show record count while the component is loading
    expect(recordCount).not.toBeInTheDocument();
    expect(currentRecords).not.toBeInTheDocument();
  });

  test('empty', () => {
    render(empty);

    const { buttons, comboboxes, recordCount, currentRecords } = getControls();

    // Make sure all controls are still disabled
    [...buttons, ...comboboxes].forEach((el) => expect(el).toBeDisabled());
    // But each button is no longer loading
    buttons.forEach((el) =>
      expect(el.classList.contains('loading')).toBeFalsy()
    );
    // We should now show a record count
    expect(recordCount).toBeInTheDocument();
    // But no count of current records yet
    expect(currentRecords).not.toBeInTheDocument();
  });

  test('totalRecordCountNoState', () => {
    render(totalRecordCountNoState);

    const { buttons, comboboxes, recordCount, currentRecords } = getControls();

    // All controls should STILL be disabled because we do not have state props yet
    [...buttons, ...comboboxes].forEach((el) => expect(el).toBeDisabled());

    // We can show both of these counts even though we do not have state props yet
    expect(recordCount).toBeInTheDocument();
    expect(currentRecords).toBeInTheDocument();
  });
});
