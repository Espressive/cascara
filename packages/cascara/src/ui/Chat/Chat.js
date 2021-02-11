import React, { useEffect, useRef } from 'react';
import pt from 'prop-types';
import { Chat as FUIChat } from '@fluentui/react-northstar';
import {
  getMessageAuthorDetails,
  getMessageGroup,
  messageTypes,
} from './utils';

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
  ).isRequired,
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
  }).isRequired,
};

// TODO: Set a loading state if no messages are passed yet
const Chat = ({ sessionUserID, messages = {}, users }) => {
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

  // When messages change
  useEffect(() => {
    handleScrollToLatestMessage();
  }, [messages]);

  // On mount
  useEffect(() => {
    handleScrollToLatestMessage();
  }, []);

  // NOTE: Some of our messages return arrays of objects and not
  // just an object, so we need to use flatMap here
  const items = messages.flatMap((msg, index, array) => {
    const previousMessage = array[index - 1];
    const nextMessage = array[index + 1];
    const getMessageObject = messageTypes[msg.type];

    const isSessionUser = sessionUserID === msg.user_id;
    const isTranslated = Boolean(msg.isTranslated); // This can probably get cleaned up later.

    // Only return if we have a defined component for this type
    return Boolean(getMessageObject)
      ? getMessageObject({
          attached: getMessageGroup(msg, previousMessage, nextMessage),
          handleScrollToLatestMessage,
          isSessionUser,
          isTranslated,
          message: msg,
          messageAuthor: getMessageAuthorDetails(users, msg.user_id),
          ref: latestMessageRef,
        })
      : null;
  });

  return <FUIChat items={items} />;
};

Chat.propTypes = propTypes;

export default Chat;
