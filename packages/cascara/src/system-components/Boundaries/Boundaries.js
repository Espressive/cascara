import React, { Suspense } from 'react';
import pt from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';
import { isValidElementType } from 'react-is';
import { ErrorFallback, SuspenseFallback } from './fallbacks';

// This will need to become a custom prop type we can use elsewhere
const isReactComponent = (props, propName, componentName) => {
  if (props[propName] && !isValidElementType(props[propName])) {
    return new Error(
      `Invalid prop '${propName}' supplied to '${componentName}': the prop is not a valid React component`
    );
  } else {
    return null;
  }
};

const propTypes = {
  ErrorComponent: isReactComponent,
  SuspenseComponent: isReactComponent,
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const Boundaries = ({
  ErrorComponent = ErrorFallback,
  SuspenseComponent = SuspenseFallback,
  children,
}) => {
  return (
    <Suspense fallback={<SuspenseComponent />}>
      <ErrorBoundary FallbackComponent={ErrorComponent}>
        {children}
      </ErrorBoundary>
    </Suspense>
  );
};

Boundaries.propTypes = propTypes;

export default Boundaries;
