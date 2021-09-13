import React from 'react';
import pt from 'prop-types';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types -- error objects
  error: pt.object,
  resetErrorBoundary: pt.func,
};

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className='ui tiny error message' role='alert'>
      <div className='header'>Something went wrong:</div>
      <pre>{error.message}</pre>
      <button
        className='ui negative button'
        onClick={resetErrorBoundary}
        type='button'
      >
        Try again
      </button>
    </div>
  );
};

ErrorFallback.propTypes = propTypes;

export default ErrorFallback;
