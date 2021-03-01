import { createContext } from 'react';

// We should ONLY put values here that are needed for ALL Modules
const defaultValue = {
  isEditing: false,
  isEditingAny: false,
  value: 'blue',
};

/*
 * We will use this baseline context to create any of our context providers from.
 * Any unique functionality should be included in that provider and not in this Context.
 */
const ModuleContext = createContext(defaultValue);

/*
 * We are also exporting the default value in case we need to hydrate or merge
 * any providers with these default values.
 */
export { defaultValue };

export default ModuleContext;
