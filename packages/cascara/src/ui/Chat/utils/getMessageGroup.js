const EMPTY_MESSAGE_FALLBACK = {
  sys_date_created: null,
  user_id: null,
};

const getMessageGroup = (
  current,
  previous = EMPTY_MESSAGE_FALLBACK,
  next = EMPTY_MESSAGE_FALLBACK
) => {
  const { sys_date_created: currentUTC, user_id: currentUser } = current;
  const { sys_date_created: previousUTC, user_id: previousUser } = previous;
  const { sys_date_created: nextUTC, user_id: nextUser } = next;

  const time = {
    current: new Date(currentUTC).getTime(),
    next: new Date(nextUTC).getTime(),
    prev: new Date(previousUTC).getTime(),
  };
  const timeDiffMins = 15;
  const prevMinDiff = Math.floor((time.current - time.prev) / 1000 / 60);
  const nextMinDiff = Math.floor((time.next - time.current) / 1000 / 60);

  // Messages can be grouped in two scenarios:
  const userGroup = {
    bottom: nextUser !== currentUser && previousUser === currentUser,
    middle: previousUser === currentUser && nextUser === currentUser,
    top: previousUser !== currentUser && nextUser === currentUser,
  };
  const timeRangeGroup = {
    bottom: nextUser === currentUser && nextMinDiff > timeDiffMins,
    middle: prevMinDiff < timeDiffMins && nextMinDiff < timeDiffMins,
    top: previousUser === currentUser && prevMinDiff > timeDiffMins,
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

  // Any message not in a group should not have any messageGrouping (return undefined)
  return messageGrouping;
};

export { getMessageGroup };
