import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DefaultErrorTemplate from './templates/DefaultErrorTemplate';

/**
 * A ErrorBoundary will catch and display an error
 */

class ErrorBoundary extends PureComponent {
  static propTypes = {
    children: PropTypes.element,
    errorTemplate: PropTypes.func,
  };

  static defaultProps = {
    children: null,
    errorTemplate: DefaultErrorTemplate,
  };

  state = {
    error: null,
    errorInfo: null,
  };

  // Catch errors in any components below and re-render with error message
  // You can also log error messages to an error reporting service here
  componentDidCatch = (error, errorInfo) => {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  };

  render() {
    const { children, errorTemplate } = this.props;

    const { error, errorInfo } = this.state;

    if (errorInfo) {
      // Error path
      return React.createElement(errorTemplate, {
        error,
        errorInfo,
      });
    }
    // Normally, just render children
    return children;
  }
}

export default ErrorBoundary;
