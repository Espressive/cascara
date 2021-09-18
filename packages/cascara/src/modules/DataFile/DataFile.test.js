import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import cosmosFixtures, { displayProps, editingProps } from './DataFile.fixture';

// We cannot destructure during import because the default export in Cosmos
// multi-fixture files is an object so we need to import the fixtures first,
// then destructure them separately.
const { display, editing, displayNoLabel, editingNoLabel } = cosmosFixtures;

describe('DataFile', () => {
  // without ModuleSandbox will render the property information into a span
  describe('display', () => {
    // We need a place to store the view for snapshot testing. This is not required when we are using `screen` directly from RTL.
    let view;

    beforeEach(() => {
      // Set the render container to our `view` so it is in scope for the snapshot test
      view = render(display).container;
    });

    test('snapshot', () => {
      expect(view).toMatchSnapshot();
    });

    test('renders a <span> by default', () => {
      const input = screen.getByLabelText(displayProps.label);
      // Make sure the actual DOM element is not render an input
      expect(input.tagName).toMatch('SPAN');
      // Input file does not display an INPUT
      expect(input.classList.contains('Input')).toBe(false);
    });
  });

  describe('editing', () => {
    // We need a place to store the view for snapshot testing. This is not required when we are using `screen` directly from RTL.
    let view;

    beforeEach(() => {
      // Set the render container to our `view` so it is in scope for the snapshot test
      view = render(editing).container;
    });

    test('snapshot', () => {
      expect(view).toMatchSnapshot();
    });

    test('renders a <input date> by default', () => {
      const input = screen.getByLabelText(editingProps.label);
      // Check that we also use the correct type
      expect(input).toHaveAttribute('type', 'file');
    });

    test('selec a file', () => {
      const file = new File(['hello'], 'hello.png', { type: 'image/png' });
      const input = screen.getByLabelText(editingProps.label);
      userEvent.upload(input, file);
      expect(input.files[0]).toStrictEqual(file);
      expect(input.files.item(0)).toStrictEqual(file);
      expect(input.files).toHaveLength(1);
    });
  });

  describe('accessibility', () => {
    test('editing', () => {
      render(editing);

      const input = screen.getByLabelText(editingProps.label);
      // The label tag is the parent wrapper
      const label = input.closest('label');

      // Test is written this way to make sure we know that both values need to be the same.
      const linkedLabelValue = editingProps.label;

      // Verify label for attribute has linked value
      expect(label).toHaveAttribute(
        'for',
        expect.stringContaining(linkedLabelValue)
      );
      // Verify input id attribute has linked value
      expect(input).toHaveAttribute(
        'id',
        expect.stringContaining(linkedLabelValue)
      );
      // Check that the input does NOT have an aria-label defined because there is a label tag
      expect(input).not.toHaveAttribute('aria-label');
    });

    test('display no label', () => {
      // Make sure that the input is still accessible with label text even when we are not showing a label tag in tables
      render(displayNoLabel);
      const input = screen.getByLabelText(displayProps.label);
      expect(input).toBeDefined();
    });

    test('editing no label', () => {
      // Make sure that the input is still accessible with label text even when we are not showing a label tag in tables
      render(editingNoLabel);
      const input = screen.getByLabelText(editingProps.label);
      expect(input).toBeDefined();
    });
  });
});
