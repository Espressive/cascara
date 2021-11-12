import React, { useCallback } from 'react';
import pt from 'prop-types';

import Button from '../../../atoms/Button/Button';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types -- error objects
  error: pt.object,
  resetErrorBoundary: pt.func,
};

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const showError = process.env.NODE_ENV === 'development';
  const handleTryAgain = useCallback(() => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    }
  }, [resetErrorBoundary]);

  return (
    <div className='ui tiny error message' role='alert'>
      <div className='header'>Something went wrong:</div>
      {showError && (
        <p>
          <pre>{error?.message}</pre>
        </p>
      )}
      <Button onClick={handleTryAgain} outcome='negative' type='button'>
        Try again
      </Button>
    </div>
  );
};

ErrorFallback.propTypes = propTypes;

export default ErrorFallback;
