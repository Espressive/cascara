import React, { useCallback, useState } from 'react';
import { Checkbox, Role } from 'reakit';
import pt from 'prop-types';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types -- error objects
  error: pt.object,
  resetErrorBoundary: pt.func,
};

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const checkedFromLS =
    window.localStorage.getItem('ESPRESSIVE_SHOW_ERRORS') === 'true';
  const [checked, setChecked] = useState(checkedFromLS);
  const showError = process.env.NODE_ENV === 'development' || checked;

  const hangleCheckboxClick = useCallback(() => {
    setChecked(!checked);
  }, [checked]);

  const hangleTryAgainClick = useCallback(() => {
    window.localStorage.setItem('ESPRESSIVE_SHOW_ERRORS', checked);

    if (resetErrorBoundary) {
      resetErrorBoundary();
    }
  }, [checked, resetErrorBoundary]);

  return (
    <Role className='ui tiny error message' role='alert'>
      <div className='header'>Something went wrong:</div>
      {showError && <pre>{error?.message}</pre>}
      <br />
      <button
        className='ui negative button'
        onClick={hangleTryAgainClick}
        type='button'
      >
        Try again
      </button>
      <label className='ui' htmlFor='chkAlwaysShowErrors'>
        <Checkbox
          checked={checked}
          id='chkAlwaysShowErrors'
          onChange={hangleCheckboxClick}
        />{' '}
        Always show errors
      </label>
    </Role>
  );
};

ErrorFallback.propTypes = propTypes;

export default ErrorFallback;
