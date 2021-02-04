import React, { useEffect, useRef } from 'react';
import pt from 'prop-types';
import { identity, memoizeWith } from 'ramda';
import {
  Chat as FUIChat,
  Provider,
  teamsTheme,
} from '@fluentui/react-northstar';
import messageTypes from './messageTypes';

const propTypes = {
  currentUserID: pt.number.isRequired,
  messages: pt.array.isRequired,
  users: pt.object.isRequired,
};

const fallback = {
  sys_date_created: null,
  user_id: null,
};

const getMessageGroup = (current, previous = fallback, next = fallback) => {
  const { sys_date_created: currentUTC, user_id: currentUser } = current;
  const { sys_date_created: previousUTC, user_id: previousUser } = previous;
  const { sys_date_created: nextUTC, user_id: nextUser } = next;

  /* eslint-disable sort-keys */

  const time = {
    prev: new Date(previousUTC).getTime(),
    current: new Date(currentUTC).getTime(),
    next: new Date(nextUTC).getTime(),
  };
  const timeDiffMins = 15;
  const prevMinDiff = Math.floor((time.current - time.prev) / 1000 / 60);
  const nextMinDiff = Math.floor((time.next - time.current) / 1000 / 60);

  // Messages can be grouped in two scenarios:
  const userGroup = {
    top: previousUser !== currentUser && nextUser === currentUser,
    middle: previousUser === currentUser && nextUser === currentUser,
    bottom: nextUser !== currentUser && previousUser === currentUser,
  };
  const timeRangeGroup = {
    top: previousUser === currentUser && prevMinDiff > timeDiffMins,
    middle: prevMinDiff < timeDiffMins && nextMinDiff < timeDiffMins,
    bottom: nextUser === currentUser && nextMinDiff > timeDiffMins,
  };

  let messageGrouping;

  const isTop = userGroup.top || timeRangeGroup.top;
  const isBottom = userGroup.bottom || timeRangeGroup.bottom;

  // A message can start a group, but not also end it
  if (isTop && !isBottom) {
    messageGrouping = 'top';
    // A message must match middle conditions from both group scenarios
  } else if (userGroup.middle && timeRangeGroup.middle) {
    messageGrouping = true;
    // A message can end a group, but not also start it
  } else if (isBottom && !isTop) {
    messageGrouping = 'bottom';
  }

  // console.table({
  //   userTop: userGroup.top,
  //   timeTop: timeRangeGroup.top,
  //   userMiddle: userGroup.middle,
  //   timeMiddle: timeRangeGroup.middle,
  //   userBottom: userGroup.bottom,
  //   timeBottom: timeRangeGroup.bottom,
  //   prevTimeDiff: prevMinDiff,
  //   nextTimeDiff: nextMinDiff,
  //   attachment,
  // });

  /* eslint-enable sort-keys */

  // Any message not in a group should not have any messageGrouping (return undefined)
  return messageGrouping;
};

const Chat = ({ currentUserID, messages, users }) => {
  const latestMessageRef = useRef(null);

  const handleScrollToBottom = () => {
    // console.log(latestMessageRef?.current);
    return latestMessageRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  };

  // When messages change
  useEffect(() => {
    handleScrollToBottom();
  }, [messages]);

  // On mount
  useEffect(() => {
    handleScrollToBottom();
  }, []);

  const getMessageAuthorDetails = memoizeWith(identity, (userID) => {
    const user = users[userID];
    const fullName = [user?.firstName, user?.lastName]
      .filter((name) => name != null)
      .join(' ');

    return { ...user, fullName };
  });

  // NOTE: Some of our messages return arrays of objects and not
  // just an object, so we need to use flatMap here
  let items = messages.flatMap((msg, index, array) => {
    const previousMessage = array[index - 1];
    const nextMessage = array[index + 1];
    const getMessageObject = messageTypes[msg.type];

    const isSessionUser = currentUserID === msg.user_id;

    // Only return if we have a defined component for this type
    return Boolean(getMessageObject)
      ? getMessageObject({
          attached: getMessageGroup(msg, previousMessage, nextMessage),
          handleScrollToBottom,
          isSessionUser,
          message: msg,
          messageAuthor: getMessageAuthorDetails(msg.user_id),
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
      <button onClick={handleScrollToBottom}>Scroll</button>
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
