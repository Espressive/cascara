# Tooltip

This component will eventually become a full export of Cascara.

As of today, there is a bug in the hook that delays showing the tooltip. This bug happens when there is a long enough delay set up and the hook tries to call the function to remove the tooltip and the tooltip has been de-rendered before the timeout. This means that the function for hiding the tooltip is no longer there when the timeout tries to call it.

One this bug is resolved, we can add the tooltip component to a full export.
