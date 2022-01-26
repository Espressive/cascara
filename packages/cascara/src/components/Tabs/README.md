# Tabs

| Status | Destination | Owner |
| ------ | ----------- | ----- |
| POC    | Cascara     | bje   |

This is an early POC for a Tabs component which can be used to show different sections below. This uses Reakit for accessibility and Semantic UI class names. This follows the Cascara PAC pattern for keeping as few configurable options as possible.

### `title`

Allows setting an optional title for a group of tabs

### `tabs`

Array of tab objects which consist of a `label` parameter and a `content` parameter.

### `actions`

TODO: We will probably want to define actions at a later date which would consist of an array of objects which can be used to generate buttons. The ActionStack component still needs to be created so we can evaluate the API for configuring it.
