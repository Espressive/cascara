import React from 'react';
import { render } from '@testing-library/react';
import Pagination from '../Pagination';
import { WARNING_STRINGS } from '../__globals';
import useDeveloperMessage from '../../../hooks/useDeveloperMessage';

const { prefix } = useDeveloperMessage;

// This suite of tests should specifically check for any expected developer
// only console warnings. Some of this may need to be abstracted out into
// general utils so we can efficiently do this on all components in Cascara.
describe('Pagination developer console warnings', () => {
  const OLD_ENV = process.env;
  const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterEach(() => {
    warn.mockReset(); // Reset our console warn
    process.env = OLD_ENV; // Restore old environment
  });

  test('show in development if usePaginationState hooks are missing', () => {
    // Set the env to environment so our message shows.
    process.env.NODE_ENV = 'development';

    // Pagination has no props defined, so it is missing all usePaginationState props
    render(<Pagination />);

    // Make sure our environment is actually development
    expect(process.env.NODE_ENV).toEqual('development');
    // Check our mock for the expected developer warning
    expect(warn).toBeCalledWith(prefix(WARNING_STRINGS.MISSING_STATE_HOOK));
  });

  test('do not show outside of development environments', () => {
    // still no state props
    render(<Pagination />);

    // Make sure we are no longer in development
    // This should have been reset in the beforeEach above
    expect(process.env.NODE_ENV).not.toEqual('development');
    // Instead of checking that warn was not called, we make sure it was not
    // called with our specific warning message. This way if there is some
    // sort of other warning that is intended, our test is still accurate in scope.
    expect(warn).not.toBeCalledWith(prefix(WARNING_STRINGS.MISSING_STATE_HOOK));
  });
});
