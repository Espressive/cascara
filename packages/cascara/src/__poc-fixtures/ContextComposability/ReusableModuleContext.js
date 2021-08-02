import { createContext } from 'react';
// import useToggle from '../../hooks/useToggle';

// We should ONLY put values in the default context for Modules that are neded by ALL modules
const defaultValue = {
  isEditing: false,
  isEditingAny: false,
};

// From this first reusable Module context, we can make various providers that might do different things based on our use case
const ReusableModuleContext = createContext(defaultValue);

export { defaultValue };

export default ReusableModuleContext;
