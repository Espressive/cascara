# Boundaries

| Status | Destination | Owner |
| ------ | ----------- | ----- |
| POC    | app_web     | bje   |

Boundaries is a POC for an error boundary and suspense boundary component which has a baked in default for both boundary types. This will likely become part of, or replace, the existing esp-ui-errorboundary package. It would make most sense to become esp-ui-boundaries package which would export main: `Boundaries`, and sub members `ErrorBoundary` and `SuspenseBoundary`. Boundaries would contain both and expose the API for both internal boundaries as optional props.

Replacing esp-ui-errorboundary would be a mater of changing the imports of that package:

```
import ErrorBoundary from 'esp-ui-errorboundary';
// to
import {ErrorBoundary} from 'esp-boundaries';
```
