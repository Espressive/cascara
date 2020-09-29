import React, { useContext } from 'react';
import ModuleContext, { ModuleProvider } from '../../../modules/ModuleContext';

const RowProvider = ({ children, value, ...props }) => {
  const grandparentValues = useContext(ModuleContext);

  const mergedValues = {
    ...grandparentValues,
    ...ModuleContext.defaultValue,
    ...value,
  };

  return (
    <ModuleProvider value={mergedValues} {...props}>
      {children}
    </ModuleProvider>
  );
};

export default RowProvider;
