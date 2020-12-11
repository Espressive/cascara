# @espressive/legacy-css

Legacy CSS code used by Espressive. These styles come from [Semantic UI](https://github.com/semantic-org/semantic-ui) build tooling and custom themes.

These styles are currently deprecated and should not be modified without good reason. Eventually as Cascara gains sufficient adoption, we will be able to remove this stylesheet from our applications completely.

These styles were built with the 2.2.13 version of Semantic UI which is not compatible with Node 12 due to an old version of Gulp. Any changes made by hand to this CSS file should be documented here just in case there is a rare scenario where we might need to build this CSS again with an old version of Node using the original templates. This is not likely.

- Added @font-face for "Inter" to get the font directly from node_modules
- Made checkboxes actually be square again like they should be
- Made input labels no longer forefully indented to the text inside the input.
