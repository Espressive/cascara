import { createContext } from 'react';

// We should ONLY put values in the default context for Modules that are neded by ALL modules
const DEFAULT_CONTEXT_VALUES = {
  isEditing: false,
  isEditingAny: false,
  value: 'blue',
};

// From this first reusable Module context, we can make various providers that might do different things based on our use case
const ReusableModuleContext = createContext(DEFAULT_CONTEXT_VALUES);

// If we do this, we can easily grab the defaults with this context if we need to hydrate a custom provider with the defaults
ReusableModuleContext.defaultValue = DEFAULT_CONTEXT_VALUES;

export default ReusableModuleContext;
