import icon from '@iconify/icons-ic/twotone-shopping-basket';
import React from 'react';

// We use the React dynamic/lazy import syntax because these components are
// being rendered in a route wrapped with a suspense fallback for code splitting
// NOTE: The webpackChunkName comment inside the import labels the output chunk
import Integrations from './Integrations';
import IntegrationsConfluence from './IntegrationsConfluence';
import IntegrationsCSV from './IntegrationsCSV';
import IntegrationsEmail from './IntegrationsEmail';
import IntegrationsOkta from './IntegrationsOkta';
// const Integrations = lazy(() =>
//   import(/* webpackChunkName: "Integrations" */ './Integrations')
// );
// const IntegrationsConfluence = lazy(() =>
//   import(
//     /* webpackChunkName: "IntegrationsConfluence" */ './IntegrationsConfluence'
//   )
// );
// const IntegrationsCSV = lazy(() =>
//   import(/* webpackChunkName: "IntegrationsCSV" */ './IntegrationsCSV')
// );
// const IntegrationsEmail = lazy(() =>
//   import(/* webpackChunkName: "IntegrationsEmail" */ './IntegrationsEmail')
// );
// const IntegrationsOkta = lazy(() =>
//   import(/* webpackChunkName: "IntegrationsOkta" */ './IntegrationsOkta')
// );

const basePath = {
  icon,
  label: 'Integrations',
  path: 'integrations',
};

const routes = {
  children: [
    {
      element: <IntegrationsConfluence />,
      label: 'Confluence',
      path: 'confluence',
    },
    {
      element: <IntegrationsCSV />,
      label: 'CSV',
      path: 'csv',
    },
    {
      element: <IntegrationsEmail />,
      label: 'Email',
      path: 'email',
    },
    {
      element: <IntegrationsOkta />,
      label: 'Okta',
      path: 'okta',
    },
  ],
  element: <Integrations />,
  path: `${basePath.path}`,
};

const integrations = {
  basePath,
  routes,
};

export default integrations;
