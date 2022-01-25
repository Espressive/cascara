# UI

This folder will likely split into other logical groupings as Cascara grows. Essentially, this is where all other components go in Cascara that are not an Atom, Layout, or Structure.

## Assumptions

- part of the Cascara public API
- follow the API Container Component pattern
  - limited surface area
  - only expose as much as we need to
  - avoid boolean props as much as we can
  - clear semantics for naming
  - prop signatures should feel familiar and consistent across all components
