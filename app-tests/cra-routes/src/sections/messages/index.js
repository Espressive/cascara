import icon from '@iconify/icons-ic/twotone-message';
import React, { lazy } from 'react';

// We use the React dynamic/lazy import syntax because these components are
// being rendered in a route wrapped with a suspense fallback for code splitting
const MessagesDetail = lazy(() => import('./MessagesDetail'));
const MessagesList = lazy(() => import('./MessagesList'));

const basePath = {
  icon,
  label: 'Messages',
  path: 'messages',
};

const routes = {
  detail: {
    element: <MessagesDetail />,
    path: basePath.path,
  },
  list: {
    element: <MessagesList />,
    path: basePath.path,
  },
};

export { MessagesDetail, MessagesList, routes, basePath };
