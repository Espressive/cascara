# useDeveloperMessage

| Status | Destination | Owner |
| ------ | ----------- | ----- |
| POC    | Cascara     | bje   |

We need a way to easily warn developers of issues in component configuration. These messages have a bit of boilerplate so we should abstract that away. A few things this hook should do:

1. Check to see if any dependencies have changed before trying to run again (useEffect)
2. Check to make sure we are in a developer environment before logging
3. Check to see if the first boolean arg is true. If not, do not log.
4. Log a warning message (second arg) if all of the above scenarios are met
5. Do not log message again unless either arg has changed since last render

We are currently adding the message prefix function to the hook so that it is present when exporting it. Not sure if this is the best pattern for consuming externally. It does group the function specifically with the hook and limits the number of exports from Cascara, so maybe we should evaluate this pattern.
