// HEADS UP!
// If we create any additional wildcard exports for a directory, make sure
// we put a note at the top of the file to warn ourselves that everything
// in that file is going to get exported.
export * from './atoms';
export * from './components';

// Scaffolding
export { default as AreaPlaceholder } from './scaffolding/AreaPlaceholder';
export { default as JsonPlaceholder } from './scaffolding/JsonPlaceholder';

// Structures
export { default as AdminStructure } from './structures/AdminStructure';
export { default as BaristaStructure } from './structures/BaristaStructure';
