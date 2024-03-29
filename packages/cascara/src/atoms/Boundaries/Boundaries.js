import React, { Suspense } from 'react';
import pt from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';
import { isValidElementType } from 'react-is';

import { ErrorFallback, SuspenseFallback } from './fallbacks';
import isDOM from '../../lib/isDOM';

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
  /** A Boundary can have an error component */
  ErrorComponent: isReactComponent,
  /** A Boundary can have an suspense component */
  SuspenseComponent: isReactComponent,
  /** The content to diplay inside the Boundary */
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const Boundaries = ({
  ErrorComponent = ErrorFallback,
  SuspenseComponent = SuspenseFallback,
  children,
}) => {
  // Currently ReactDOMServer does not support Suspense, but we are using it here.
  // This is a temporary check to make sure that we check to see if we are in a browser,
  // and if we are, then we are safe to render the boundaries. If we are not, we are on
  // a server (like Vercel) we an render nothing because the app will render as normal.
  // once it loads in the client browser and the app hydrates.

  if (isDOM) {
    return (
      <Suspense fallback={<SuspenseComponent />}>
        <ErrorBoundary FallbackComponent={ErrorComponent}>
          {children}
        </ErrorBoundary>
      </Suspense>
    );
  } else {
    return null;
  }
};

Boundaries.propTypes = propTypes;

export default Boundaries;
