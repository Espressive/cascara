# Testing Library

Version: 8.11.3
Date: 2021-06-23

### BREAKING CHANGES

- Remove deprecated `waitFormDOMChange`
- Remove deprecated `waitForElement`
- The `timeout` in `waitFor(callback, { interval, timeout } )` now uses the same clock as `interval`. Previously `timeout` was always using the real clock while `interval` was using the global clock which could've been mocked out. For the old behavior I'd recommend `waitFor(callback, { interval, timeout: Number.POSITIVE_INFINITY })` and rely on your test runner to timeout considering real timers.
- `<script />`, `<style />` and comment nodes are now ignored by default in `prettyDOM` .If you whish to return to the old behavior, use a custom `filterNode` function. In this case `prettyDOM(element, { filterNode: () => true })`.
- node 10 is no longer supported. It reached its end-of-life on 30.04.2021.

### Ecosystem updates

- @testing-library/dom -> 8.11.3
- @testing-library/jest-dom -> 5.16.2
- @testing-library/react -> 12.1.3
- @testing-library/user-event -> 13.5.0
