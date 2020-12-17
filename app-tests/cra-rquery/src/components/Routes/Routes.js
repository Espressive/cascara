import React from 'react';
import { useRoutes } from 'react-router-dom';

import Home from '../pages/Home';
import Applications from '../pages/Applications';

const AppRoutes = () =>
  useRoutes([
    { path: '*', element: <Home /> },
    { path: '/applications', element: <Applications /> },
  ]);

export default AppRoutes;
