import React from 'react';
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
  const timeDiff = 15;
  const prevMinDiff = Math.floor((time.current - time.prev) / 1000 / 60);
  const nextMinDiff = Math.floor((time.next - time.current) / 1000 / 60);

  // Messages can be grouped in two scenarios:
  const userGroup = {
    top: previousUser !== currentUser && nextUser === currentUser,
    middle: previousUser === currentUser && nextUser === currentUser,
    bottom: nextUser !== currentUser && previousUser === currentUser,
  };
  const timeRangeGroup = {
    top: previousUser === currentUser && prevMinDiff > timeDiff,
    middle: prevMinDiff < timeDiff && nextMinDiff < timeDiff,
    bottom: nextUser === currentUser && nextMinDiff > timeDiff,
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
  const getMessageAuthorDetails = memoizeWith(identity, (userID) => {
    const user = users[userID];

    return { ...user, fullName: user?.firstName + ' ' + user?.lastName };
  });

  const items = messages.map((msg, index, array) => {
    const previousMessage = array[index - 1];
    const nextMessage = array[index + 1];
    const getMessageObject = messageTypes[msg.type];

    const isSessionUser = currentUserID === msg.user_id;

    // Only return if we have a defined component for this type
    return Boolean(getMessageObject)
      ? getMessageObject({
          attached: getMessageGroup(msg, previousMessage, nextMessage),
          isSessionUser,
          message: msg,
          messageAuthor: getMessageAuthorDetails(msg.user_id),
        })
      : null;
  });

  // console.log(items);

  return (
    <Provider theme={teamsTheme}>
      <FUIChat items={items} />
    </Provider>
  );
};

Chat.propTypes = propTypes;

export default Chat;
