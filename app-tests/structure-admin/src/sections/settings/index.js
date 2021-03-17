import icon from '@iconify/icons-ic/twotone-settings';
import React from 'react';

// We use the React dynamic/lazy import syntax because these components are
// being rendered in a route wrapped with a suspense fallback for code splitting
// NOTE: The webpackChunkName comment inside the import labels the output chunk
import Settings from './Settings';
import SettingsBranding from './SettingsBranding';
import SettingsNotifications from './SettingsNotifications';
import SettingsLinkMetadata from './SettingsLinkMetadata';
import SettingsCustomization from './SettingsCustomization';

// const Settings = lazy(() =>
//   import(/* webpackChunkName: "Settings" */ './Settings')
// );
// const SettingsBranding = lazy(() =>
//   import(/* webpackChunkName: "SettingsBranding" */ './SettingsBranding')
// );
// const SettingsNotifications = lazy(() =>
//   import(
//     /* webpackChunkName: "SettingsNotifications" */ './SettingsNotifications'
//   )
// );
// const SettingsLinkMetadata = lazy(() =>
//   import(
//     /* webpackChunkName: "SettingsLinkMetadata" */ './SettingsLinkMetadata'
//   )
// );
// const SettingsCustomization = lazy(() =>
//   import(
//     /* webpackChunkName: "SettingsCustomization" */ './SettingsCustomization'
//   )
// );

const basePath = {
  icon,
  label: 'Settings',
  path: 'settings',
};

const routes = {
  children: [
    {
      element: <SettingsBranding />,
      label: 'Branding',
      path: '',
    },
    {
      element: <SettingsNotifications />,
      label: 'Notifications',
      path: 'notifications',
    },
    {
      element: <SettingsLinkMetadata />,
      label: 'Link Metadata',
      path: 'link-metadata',
    },
    {
      element: <SettingsCustomization />,
      label: 'Customization',
      path: 'customization',
    },
  ],
  element: <Settings />,
  path: `${basePath.path}`,
};

const settings = {
  basePath,
  routes,
};

export default settings;
