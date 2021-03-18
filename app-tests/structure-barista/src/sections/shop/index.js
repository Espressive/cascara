import icon from '@iconify/icons-ic/twotone-shopping-basket';
import React, { lazy } from 'react';

// We use the React dynamic/lazy import syntax because these components are
// being rendered in a route wrapped with a suspense fallback for code splitting
// NOTE: The webpackChunkName comment inside the import labels the output chunk
const ShopDetail = lazy(() =>
  import(/* webpackChunkName: "ShopDetail" */ './ShopDetail')
);
const ShopList = lazy(() =>
  import(/* webpackChunkName: "ShopList" */ './ShopList')
);

const basePath = {
  icon,
  label: 'Shop',
  path: 'shop',
};

const routes = {
  detail: {
    element: <ShopDetail />,
    path: `${basePath.path}/:id`,
  },
  list: {
    element: <ShopList />,
    path: `${basePath.path}/*`,
  },
};

export { ShopDetail, ShopList, routes, basePath };
