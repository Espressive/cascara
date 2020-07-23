## New Component Checklist

- [ ] Includes unit tests for _ALL_ required FDS use cases
- [ ] Does not mute any top level API props in React
- [ ] Includes an explanation for any changes to Jest snapshots (should be a PR tag automatically added if this happens)
- [ ] Component uses `React.forwardRef()` when a single DOM node is returned, _AND_ it makes React-sense to access that DOM node
