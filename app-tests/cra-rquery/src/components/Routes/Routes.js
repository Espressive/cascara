import React from 'react';
import { useRoutes } from 'react-router-dom';

import Home from '../pages/Home';
import Users from '../pages/Users';
import Posts from '../pages/Posts';

const AppRoutes = () =>
  useRoutes([
    { path: '*', element: <Home /> },
    { path: '/users', element: <Users /> },
    { path: '/posts', element: <Posts /> },
  ]);

export default AppRoutes;
