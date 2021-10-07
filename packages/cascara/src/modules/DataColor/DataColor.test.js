import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Form from '../../ui/Form';

import cosmosFixtures, {
  displayProps,
  editingProps,
} from './DataColor.fixture';

const { display, editing, displayNoLabel, editingNoLabel } = cosmosFixtures;

describe('DataColor', () => {
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
      // Make sure the dom element that has our aria-label is the input
      expect(input.classList.contains('Color')).toBe(true);
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

    test('renders a <input email> by default', () => {
      const input = screen.getByLabelText(editingProps.label);
      // Check that we also use the correct type
      expect(input).toHaveAttribute('type', 'color');
    });

    test('change value', () => {
      const newColor = '#e66465';
      const input = screen.getByLabelText(editingProps.label);
      fireEvent.change(input, { target: { value: newColor } });
      expect(input).toHaveValue(newColor);
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

  describe('datacheckbox', () => {
    test('it returns the correct data type', async () => {
      const onAction = jest.fn();

      render(
        <Form
          actions={{
            modules: [
              {
                module: 'edit',
              },
            ],
          }}
          data={{
            color: '#AAAA',
            id: '01',
          }}
          dataDisplay={[
            {
              attribute: 'id',
              label: 'ID',
              module: 'text',
            },
            {
              attribute: 'color',
              label: 'Color',
              module: 'color',
            },
          ]}
          isInitialEditing
          onAction={onAction}
        />
      );

      await waitFor(() => screen.findByRole('color', { name: 'Cdolor' }));

      const testSubject = screen.getByRole('color', { name: 'Color' });
      fireEvent.type(testSubject, '#e1e1e1');

      const saveButton = screen.getByRole('button', { name: 'Save' });
      fireEvent.click(saveButton);

      expect(onAction).toBeCalledWith({ name: 'edit.save' });
      // expect(log.mock.calls[0][1]).toEqual({ checkbox: true });
    });
  });
});
