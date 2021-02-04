import React from 'react';
import {
  Animation,
  Chat as FUIChat,
  Provider,
} from '@fluentui/react-northstar';
import { MoreIcon } from '@fluentui/react-icons-northstar';

import getSharedMessageKeys from './getSharedMessageKeys';

const transforms = [
  'rotate(0deg)',
  'scale(1.1)rotate(5deg)',
  'rotate(-5deg)',
  'scale(.9)rotate(0deg)',
  'rotate(-5deg)',
  'scale(1.1)rotate(5deg)',
  'rotate(0deg)',
  'scale(.9)rotate(5deg)',
  'rotate(-5deg)',
  'scale(1.1)rotate(0deg)',
  'rotate(-5deg)',
  'scale(.9)rotate(5deg)',
  'rotate(0deg)',
];

const wiggle = {
  duration: '2s',
  iterationCount: 'infinite',
  keyframe: Object.assign(
    {},
    ...transforms.map((movement, i) => {
      const keyframePercent =
        Math.floor((i / (transforms.length - 1)) * 100) + '%';

      return { [keyframePercent]: { transform: movement } };
    })
  ),
};

const typingIcon = (
  <Provider
    theme={{
      animations: {
        wiggle,
      },
    }}
  >
    <Animation name='wiggle'>
      <MoreIcon
        size='larger'
        styles={({ theme: { siteVariables } }) => ({
          color: siteVariables.colorScheme.brand.foreground,
        })}
      />
    </Animation>
  </Provider>
);

const ChatTyping = ({ isSessionUser, timestamp, ref }) => (
  <FUIChat.Message
    content={typingIcon}
    mine={isSessionUser}
    style={{ minWidth: 'auto' }}
    timestamp={timestamp}
  />
);

ChatTyping.displayName = 'Chat.Typing';

// This returns the object that FUI is expecting, along with the component and props
const getChatTypingObj = (obj) => {
  const { isSessionUser, message, messageAuthor, ref } = obj;

  return {
    ...getSharedMessageKeys(obj),
    message: (
      <span id={message.id} ref={ref}>
        <ChatTyping
          authorName={messageAuthor.fullName}
          isSessionUser={isSessionUser}
          {...message}
        />
      </span>
    ),
  };
};

export { getChatTypingObj };

export default ChatTyping;
