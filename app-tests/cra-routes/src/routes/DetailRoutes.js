import { useRoutes } from 'react-router-dom';

import { routes as messagesRoutes } from '../sections/messages';
import { routes as directoryRoutes } from '../sections/directory';

const detailRoutes = [messagesRoutes.detail, directoryRoutes.detail];

// This basically creates a "Routes" component from an array of route
// objects. The string and definition of each of these objects is
// defined in the root of each section and is exported for use in
// routing and navigating.
const DetailRoutes = () => {
  const element = useRoutes(detailRoutes);

  return element;
};

export default DetailRoutes;
