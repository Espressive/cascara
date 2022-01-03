import React, { useContext } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { act, renderHook } from '@testing-library/react-hooks';

import { ModuleProvider } from '../context';

import ActionButton from './ActionButton';

const actionName = 'action name';

describe('ActionButton', () => {
  describe('should render with a name', () => {
    test('with an action name', () => {
      render(<ActionButton actionName={actionName} />);
      const input = screen.getByText(actionName);
      expect(input).toBeVisible();
    });
    test('with the name', () => {
      render(<ActionButton name={actionName} />);
      const input = screen.getByText(actionName);
      expect(input).toBeVisible();
    });
    test('render the action name even name exists', () => {
      const onlyname = 'onlyname';
      render(<ActionButton actionName={onlyname} name={actionName} />);
      const input = screen.getByText(onlyname);
      expect(input).toBeVisible();
    });
  });
  describe('should render with a text', () => {
    test('should render the content', () => {
      const content = 'button content';
      render(<ActionButton actionName={actionName} content={content} />);
      const input = screen.getByText(content);
      expect(input).toBeVisible();
    });
    test('should render the label', () => {
      const content = 'label content';
      render(<ActionButton actionName={actionName} content={content} />);
      const input = screen.getByText(content);
      expect(input).toBeVisible();
    });
    test('should render the name', () => {
      const content = 'label name';
      render(<ActionButton actionName={actionName} content={content} />);
      const input = screen.getByText(content);
      expect(input).toBeVisible();
    });
  });
  describe('should trigger the action', () => {
    test('clicking on the action button', () => {
      const onAction = jest.fn();
      const content = 'label name';
      const Wrapper = () => (
        <ModuleProvider value={{ onAction }}>
          <ActionButton actionName={actionName} content={content} />
        </ModuleProvider>
      );

      render(<Wrapper />);
      const input = screen.getByText(content);
      fireEvent.click(input);
      expect(onAction).toHaveBeenCalled();
    });
    test('and should not render the button if is editing', () => {
      const content = 'label name';
      const Wrapper = () => (
        <ModuleProvider value={{ isEditing: true }}>
          <ActionButton actionName={actionName} content={content} />
        </ModuleProvider>
      );
      render(<Wrapper />);
      const input = screen.queryByText(content);
      expect(input).toBeNull();
    });
  });
});
