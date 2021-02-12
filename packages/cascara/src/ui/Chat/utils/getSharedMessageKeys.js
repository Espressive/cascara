import React from 'react';
import ChatAvatar from '../ChatAvatar';

const getSharedMessageKeys = ({
  attached,
  isSessionUser,
  message,
  messageAuthor,
}) => ({
  attached,
  contentPosition: isSessionUser ? 'end' : 'start',
  gutter: <ChatAvatar {...messageAuthor} />,
  key: message.id,
});

export { getSharedMessageKeys };
