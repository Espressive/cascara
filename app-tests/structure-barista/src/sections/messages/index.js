import icon from '@iconify-icons/ic/twotone-message';
import React, { lazy } from 'react';

// We use the React dynamic/lazy import syntax because these components are
// being rendered in a route wrapped with a suspense fallback for code splitting
// NOTE: The webpackChunkName comment inside the import labels the output chunk
const MessagesDetail = lazy(() =>
  import(/* webpackChunkName: "MessagesDetail" */ './MessagesDetail')
);
const MessagesList = lazy(() =>
  import(/* webpackChunkName: "MessagesList" */ './MessagesList')
);

const basePath = {
  icon,
  label: 'Messages',
  path: 'messages',
};

const routes = {
  detail: {
    element: <MessagesDetail />,
    path: `${basePath.path}/:id`,
  },
  list: {
    element: <MessagesList />,
    path: `${basePath.path}/*`,
  },
};

export { MessagesDetail, MessagesList, routes, basePath };
