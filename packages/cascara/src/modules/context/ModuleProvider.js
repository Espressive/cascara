import React from 'react';
import ModuleContext, { defaultValue } from './ModuleContext';
import useToggle from '../../hooks/useToggle';

const ModuleProvider = ({ children, value, ...props }) => {
  const [isEditing, setIsEditing] = useToggle(value?.isEditing || false);

  const mergedValues = {
    ...defaultValue,
    isEditing,
    setIsEditing,
    ...value,
  };

  return (
    <ModuleContext.Provider value={mergedValues} {...props}>
      {children}
    </ModuleContext.Provider>
  );
};

export default ModuleProvider;
