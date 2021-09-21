import React from 'react';
import Boundaries from './Boundaries';
import { ErrorFallback, SuspenseFallback } from './fallbacks';

const TestFallbackComponent = () => <div>TestFallbackComponent</div>;

const InvalidFallbacks = () => (
  <>
    <h2>Invalid Fallbacks</h2>
    If an invalid React component is defined for either fallback component,
    there should be a prop-type warning. Both of these should throw warnings.
    <Boundaries
      ErrorComponent={<TestFallbackComponent />}
      SuspenseComponent={<TestFallbackComponent />}
    >
      <h1>Hi</h1>
    </Boundaries>
  </>
);

export default {
  default: (
    <Boundaries>
      <h1>Hi</h1>
    </Boundaries>
  ),
  invalidFallbacks: <InvalidFallbacks />,
  ErrorFallback: <ErrorFallback />,
  SuspenseFallback: <SuspenseFallback />,
};
