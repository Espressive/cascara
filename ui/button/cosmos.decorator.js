// The only thing this decorator will do for now is import our SUI custom CSS.
// There are currently issues with the out of the box compiled styles there
// and possibly some missing loaders so we will use a different variant for now
// that does not have any missing font/image dependencies.

// import 'semantic-ui-css-custom';

import 'semantic-ui-css-offline';

// NOTE: export is needed or else this decorator mutes all fixture children
export default ({ children }) => children;
