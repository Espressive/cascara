import React from 'react';
import { Chat as FUIChat } from '@fluentui/react-northstar';

import ChatAvatar from './ChatAvatar';

const Message = ({ authorName, isSessionUser, text, timestamp }) => (
  <FUIChat.Message
    author={authorName}
    content={text}
    mine={isSessionUser}
    timestamp={timestamp}
  />
);

Message.displayName = 'Chat.Message';

// This returns the object that FUI is expecting, along with the component and props
const chatMessage = ({ attached, isSessionUser, message, messageAuthor }) => {
  return {
    attached,
    contentPosition: isSessionUser ? 'end' : 'start',
    gutter: <ChatAvatar {...messageAuthor} />,
    key: message.id,
    message: (
      <Message
        authorName={messageAuthor.fullName}
        isSessionUser={isSessionUser}
        {...message}
      />
    ),
  };
};

export default chatMessage;
