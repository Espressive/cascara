import React, { useEffect, useRef } from 'react';
import pt from 'prop-types';
import {
  Chat as FUIChat,
  Provider,
  teamsTheme,
} from '@fluentui/react-northstar';
import ChatProvider from './ChatProvider';
import { getMessageAuthorDetails, getMessageGroup } from './utils';
import messageTypes from './messageTypes';
import { Boundaries } from '../../system-components';
import { loadingMessages, loadingTheme } from './loadingState';

const propTypes = {
  /** A message object to display one of the allowed chat types */
  messages: pt.arrayOf(
    pt.shape({
      attached: pt.oneOf(['top', true, 'bottom']),
      id: pt.string.isRequired,
      sys_date_created: pt.string.isRequired,
      /** Should match one of the allowed message types */
      type: pt.oneOf(Object.keys(messageTypes)).isRequired,
      user_id: pt.number,
    })
  ),
  /** The ID of the current logged in user, should match a key in the `users` prop */
  sessionUserID: pt.number,
  /** Flat map of users to display. Keys should be a user ID. */
  users: pt.shape({
    firstName: pt.string,
    imageUrl: pt.string,
    lastName: pt.string,
    // status: pt.shape({
    //   color: pt.string,
    //   icon: pt.string,
    // }),
  }),
};

// TODO: Set a loading state if no messages are passed yet
const ChatMessages = ({ sessionUserID, messages, users }) => {
  // The latestMessageRef is always assigned to the
  // latest message that has appeared in the Chat
  const latestMessageRef = useRef(null);

  // We scroll to the latest message, not to the bottom of the chat
  // which leads to a better user experience when the last message is long
  const handleScrollToLatestMessage = () => {
    return latestMessageRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  };

  // For initial load or image load, we want to scroll fully to the bottom
  // right away. This does mean that when images load, we may scroll. We
  // may want to explore adding both of these to a throttle
  const handleScrollToBottom = () => {
    return latestMessageRef?.current?.scrollIntoView({
      block: 'end',
    });
  };

  // When messages change
  useEffect(() => {
    handleScrollToLatestMessage();
  }, [messages]);

  // On mount
  useEffect(() => {
    handleScrollToBottom();
  }, []);

  // We do this instead of defining default props so we can make sure we use the loading messages for
  // undefined, null, or empty arrays
  const currentMessages = messages || loadingMessages;

  // NOTE: Some of our messages return arrays of objects and not
  // just an object, so we need to use flatMap here
  const items = currentMessages.flatMap((msg, index, array) => {
    const previousMessage = array[index - 1];
    const nextMessage = array[index + 1];
    const getMessageObject = messageTypes[msg.type];

    const isSessionUser = sessionUserID === msg.user_id;
    const isTranslated = Boolean(msg.isTranslated); // This can probably get cleaned up later.

    // Only return if we have a defined component for this type
    return getMessageObject
      ? getMessageObject({
          attached: getMessageGroup(msg, previousMessage, nextMessage),
          handleScrollToBottom,
          isSessionUser,
          isTranslated,
          message: msg,
          messageAuthor: getMessageAuthorDetails(users, msg.user_id),
          ref: latestMessageRef,
        })
      : null;
  });

  const animations = {
    chatMessage: messages
      ? { ...teamsTheme.animations.scaleEnterNormal }
      : {
          ...teamsTheme.animations.fadeEnterUltraSlow,
          direction: 'alternate-reverse',
          iterationCount: 'infinite',
        },
  };

  return (
    <Boundaries>
      <Provider
        theme={messages ? { animations } : { animations, ...loadingTheme }}
      >
        <FUIChat items={items} />
      </Provider>
    </Boundaries>
  );
};

ChatMessages.propTypes = propTypes;
ChatMessages.Provider = ChatProvider;

export default ChatMessages;
