import icon from '@iconify/icons-ic/twotone-supervised-user-circle';
import React, { lazy } from 'react';

// We use the React dynamic/lazy import syntax because these components are
// being rendered in a route wrapped with a suspense fallback for code splitting
const DirectoryDetail = lazy(() =>
  import(/* webpackChunkName: "DirectoryDetail" */ './DirectoryDetail')
);
const DirectoryList = lazy(() =>
  import(/* webpackChunkName: "DirectoryList" */ './DirectoryList')
);

const basePath = {
  icon,
  label: 'Directory',
  path: 'directory',
};

const routes = {
  detail: {
    element: <DirectoryDetail />,
    path: `${basePath.path}/:id`,
  },
  list: {
    element: <DirectoryList />,
    path: `${basePath.path}/*`,
  },
};

export { DirectoryDetail, DirectoryList, routes, basePath };
