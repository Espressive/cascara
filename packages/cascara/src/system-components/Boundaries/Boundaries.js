import React from 'react';
import pt from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';

const propTypes = {
  ErrorFallbackComponent: pt.element,
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const Boundaries = ({ ErrorFallbackComponent = ErrorFallback, children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
      {children}
    </ErrorBoundary>
  );
};

Boundaries.propTypes = propTypes;

export default Boundaries;
