// import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from '.';

// This basically creates a "Routes" component from an array of route
// objects. The string and definition of each of these objects is
// defined in the root of each section and is exported for use in
// routing and navigating.
const MainRoutes = () => {
  // console.log(routes);
  const element = useRoutes(routes, process.env.PUBLIC_URL);

  return element;
};

export default MainRoutes;
