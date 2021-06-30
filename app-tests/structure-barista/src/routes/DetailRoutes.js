// import React from 'react';
import { useRoutes } from 'react-router-dom';

import { routes as messagesRoutes } from '../sections/messages';
import { routes as directoryRoutes } from '../sections/directory';
import { routes as shopRoutes } from '../sections/shop';

// import { Detail } from '../layout';

// const fallback = {
//   element: <Detail isLoading />,
//   path: '/',
// };

const routes = [messagesRoutes, directoryRoutes, shopRoutes];

const detailRoutes = routes.map((route) => route.detail);

// This basically creates a "Routes" component from an array of route
// objects. The string and definition of each of these objects is
// defined in the root of each section and is exported for use in
// routing and navigating.
const DetailRoutes = () => {
  const element = useRoutes(detailRoutes);

  return element;
};

export default DetailRoutes;
