import icon from '@iconify/icons-ic/twotone-message';
import React from 'react';
import MessagesDetail from './MessagesDetail';
import MessagesList from './MessagesList';

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
