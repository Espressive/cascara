# Layouts

Layouts are more complex components with additional, helpful logic that ties other Cascara components together, usually with some limited implementation details.

## Assumptions

- part of the Cascara public API.
- help developers implement repeated, complex groupings of components
- only the most common, repeated group patterns should become Layouts
- components composed in a Layout should typically have familiar APIs which we can expose one time at the Layout level
