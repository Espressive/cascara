import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

const DefaultErrorTemplate = ({
  error = new Error(),
  errorInfo = {
    componentStack: '',
  },
  ...rest
}) => (
  <Message
    content={
      <details
        style={{
          fontSize: '12px',
          whiteSpace: 'pre-wrap',
        }}
      >
        {errorInfo.componentStack}
      </details>
    }
    error
    header={error ? error.toString() : 'something went wrong'}
    size='small'
    {...rest}
  />
);
DefaultErrorTemplate.propTypes = {
  error: PropTypes.instanceOf(Error),
  errorInfo: PropTypes.shape({
    componentStack: PropTypes.string.isRequired,
  }),
};

export default DefaultErrorTemplate;
