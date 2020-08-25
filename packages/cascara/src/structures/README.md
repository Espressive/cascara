# Structures

Structures are foundational components that determine the structural presentation of an application overall.

## Assumptions

- part of the Cascara public API.
- used to drop in at the root of an application
- does not rely on external details like routers, etc
- responsive for our defined screen sizes
- does not have any state (except for handling open/closed states for drawers for responsive structures)
- has fallbacks for CSS custom properties if a tenant theme provider is not present
