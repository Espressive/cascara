import React from 'react';
import pt from 'prop-types';

import ModuleContext, { defaultValue } from './ModuleContext';
import useToggle from '../../hooks/useToggle';

const propTypes = {
  children: pt.oneOfType([pt.element, pt.arrayOf(pt.element)]),
  value: pt.shape({
    isEditing: pt.bool,
  }),
};

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

ModuleProvider.propTypes = propTypes;

export default ModuleProvider;
