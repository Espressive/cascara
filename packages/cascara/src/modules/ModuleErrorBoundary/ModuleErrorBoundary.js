import React from 'react';
import pt from 'prop-types';

import { Boundaries } from '../../system-components';
import ModuleErrorFallback from './ModuleErrorFallback';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const ModuleErrorBoundary = ({ children }) => {
  return (
    <Boundaries ErrorFallbackComponent={ModuleErrorFallback}>
      {children}
    </Boundaries>
  );
};

ModuleErrorBoundary.propTypes = propTypes;

export default ModuleErrorBoundary;
