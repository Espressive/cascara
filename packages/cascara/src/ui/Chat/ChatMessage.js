import React, { forwardRef } from 'react';
import { Chat as FUIChat } from '@fluentui/react-northstar';
import getSharedMessageKeys from './getSharedMessageKeys';

const ChatMessage = forwardRef(
  ({ authorName, isSessionUser, text, timestamp }, ref) => (
    <FUIChat.Message
      author={authorName}
      content={text}
      mine={isSessionUser}
      ref={ref}
      timestamp={timestamp}
    />
  )
);
ChatMessage.displayName = 'Chat.Message';

// This returns the object that FUI is expecting, along with the component and props
const getChatMessageObj = (obj) => {
  const { isSessionUser, message, messageAuthor, ref } = obj;

  return {
    ...getSharedMessageKeys(obj),
    message: (
      <span id={message.id} ref={ref}>
        <ChatMessage
          authorName={messageAuthor.fullName}
          id={message.id}
          isSessionUser={isSessionUser}
          {...message}
        />
      </span>
    ),
  };
};

export { getChatMessageObj };

export default ChatMessage;
