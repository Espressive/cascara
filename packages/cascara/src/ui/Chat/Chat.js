import React, { useEffect, useRef } from 'react';
import pt from 'prop-types';
import {
  Chat as FUIChat,
  Provider,
  teamsTheme,
} from '@fluentui/react-northstar';
import {
  getMessageAuthorDetails,
  getMessageGroup,
  messageTypes,
} from './utils';

const propTypes = {
  // cool: pt.bool.isRequired,
  currentUserID: pt.number.isRequired,
  messages: pt.arrayOf(
    pt.shape({
      attached: pt.oneOf(['top', true, 'bottom']),
      id: pt.string.isRequired,
      sys_date_created: pt.string.isRequired,
      type: pt.oneOf(Object.keys(messageTypes)).isRequired,
      user_id: pt.number,
    })
  ).isRequired,
  users: pt.object.isRequired,
};

const Chat = ({ currentUserID, messages, users }) => {
  // const useState()

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
  let items = messages.flatMap((msg, index, array) => {
    const previousMessage = array[index - 1];
    const nextMessage = array[index + 1];
    const getMessageObject = messageTypes[msg.type];

    const isSessionUser = currentUserID === msg.user_id;
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

  return (
    <Provider
      style={{
        backgroundColor: 'lightgray',
        height: '100vh',
        padding: '1em',
      }}
      theme={teamsTheme}
    >
      <button onClick={handleScrollToLatestMessage}>Scroll</button>
      <button>Teams Theme</button>
      <button>Barista Theme</button>
      <div
        style={{
          height: '80vh',
          overflowY: 'auto',
        }}
      >
        <FUIChat items={items} />
      </div>
    </Provider>
  );
};

Chat.propTypes = propTypes;

export default Chat;
