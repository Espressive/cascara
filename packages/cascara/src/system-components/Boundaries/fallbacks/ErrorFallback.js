import React from 'react';
import pt from 'prop-types';
import { Role } from 'reakit/Role';
import { Button } from 'reakit/Button';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types -- error objects
  error: pt.object,
  resetErrorBoundary: pt.func,
};

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Role className='ui tiny error message' role='alert'>
      <div className='header'>Something went wrong:</div>
      <pre>{error?.message}</pre>
      <Button className='ui negative button' onClick={resetErrorBoundary}>
        Try again
      </Button>
    </Role>
  );
};

ErrorFallback.propTypes = propTypes;

export default ErrorFallback;
