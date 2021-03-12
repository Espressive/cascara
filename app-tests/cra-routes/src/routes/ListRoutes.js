import { useRoutes } from 'react-router-dom';

import { routes as messagesRoutes } from '../sections/messages';
import { routes as directoryRoutes } from '../sections/directory';
import { routes as shopRoutes } from '../sections/shop';

const routes = [messagesRoutes, directoryRoutes, shopRoutes];

const listRoutes = routes.map((route) => route.list);

// This basically creates a "Routes" component from an array of route
// objects. The string and definition of each of these objects is
// defined in the root of each section and is exported for use in
// routing and navigating.
const ListRoutes = () => {
  const element = useRoutes(listRoutes);

  return element;
};

export default ListRoutes;
