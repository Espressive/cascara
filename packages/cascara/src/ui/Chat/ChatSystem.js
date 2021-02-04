import React from 'react';
import { Divider } from '@fluentui/react-northstar';

const ChatSystem = ({ text }) => (
  <Divider color='brand' content={text} important />
);

ChatSystem.displayName = 'Chat.System';

// This returns the object that FUI is expecting, along with the component and props
const getChatSystemObj = ({ message, ref }) => {
  return {
    // NOTE: System messages are expected to be returned as children, not as a `message` key
    children: (
      <span id={message.id} ref={ref}>
        <ChatSystem {...message} />
      </span>
    ),
    key: message.id,
  };
};

export { getChatSystemObj };

export default ChatSystem;
