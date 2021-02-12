import React from 'react';
import ChatAvatar from '../ChatAvatar';

const getSharedMessageKeys = ({
  attached,
  isSessionUser,
  message,
  messageAuthor,
  key,
}) => ({
  attached,
  contentPosition: isSessionUser ? 'end' : 'start',
  gutter: <ChatAvatar {...messageAuthor} />,
  key,
});

export { getSharedMessageKeys };
