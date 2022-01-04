import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { ModuleProvider } from '../context';

import ActionEdit from './ActionEdit';

describe('ActionEdit', () => {
  describe('is isEditing and submitting', () => {
    const handleSubmit = jest.fn();
    const reset = jest.fn();
    beforeEach(() => {
      const wrapperValues = {
        formMethods: {
          formState: {
            isDirty: false,
            isSubmitting: true,
          },
          handleSubmit,
          reset,
        },
        isEditing: true,
      };
      const Wrapper = () => (
        <ModuleProvider value={{ ...wrapperValues }}>
          <ActionEdit />
        </ModuleProvider>
      );
      render(<Wrapper />);
    });
    test('should render Cancel and Save buttons', () => {
      expect(screen.getByLabelText('Cancel')).toBeVisible();
      expect(screen.getByLabelText('Save')).toBeVisible();
    });
    test('cancel button should be disabled if is submitting', () => {
      expect(screen.getByLabelText('Cancel')).toBeDisabled();
      expect(screen.getByLabelText('Save')).toBeDisabled();
    });
  });
  describe('is isEditing and not submitting', () => {
    const handleSubmit = jest.fn();
    const reset = jest.fn();
    const exitEditMode = jest.fn();
    const onAction = jest.fn();
    beforeEach(() => {
      const wrapperValues = {
        exitEditMode,
        formMethods: {
          formState: {
            isDirty: true,
            isSubmitting: false,
          },
          handleSubmit,
          reset,
        },
        isEditing: true,
        onAction,
      };
      const Wrapper = () => (
        <ModuleProvider value={{ ...wrapperValues }}>
          <ActionEdit />
        </ModuleProvider>
      );
      render(<Wrapper />);
    });
    test('cancel button should be enabled if is not submitting', () => {
      expect(screen.getByLabelText('Cancel')).toBeEnabled();
      expect(screen.getByLabelText('Save')).toBeEnabled();
    });
    test('should submit when click on save button', () => {
      fireEvent.click(screen.getByLabelText('Save'));
      expect(handleSubmit).toHaveBeenCalled();
    });
    test('should call exit method if Cancel button is triggered', () => {
      const jsdomConfirm = window.confirm;
      window.confirm = () => true;
      fireEvent.click(screen.getByLabelText('Cancel'));
      expect(exitEditMode).toHaveBeenCalled();
      window.confirm = jsdomConfirm; // restore the jsdom confirm
    });
  });
  describe('render if is not editing', () => {
    const handleSubmit = jest.fn();
    const reset = jest.fn();
    const onAction = jest.fn();
    beforeEach(() => {
      const wrapperValues = {
        formMethods: {
          formState: {
            isDirty: false,
            isSubmitting: false,
          },
          handleSubmit,
          reset,
        },
        isEditing: false,
        onAction,
      };
      const Wrapper = () => (
        <ModuleProvider value={{ ...wrapperValues }}>
          <ActionEdit />
        </ModuleProvider>
      );
      render(<Wrapper />);
    });
    test('should render Edit button', () => {
      expect(screen.getByLabelText('Edit')).toBeEnabled();
    });
    test('should enter to Edit mode', () => {
      fireEvent.click(screen.getByLabelText('Edit'));
      expect(reset).toHaveBeenCalled();
      expect(onAction).toHaveBeenCalled();
    });
  });
});
