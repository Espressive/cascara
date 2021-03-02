import memoizeOne from 'memoize-one';

const authorDetails = (users, userID) => {
  if (users) {
    const user = users[userID];
    const fullName = [user?.firstName, user?.lastName]
      .filter((name) => name != null)
      .join(' ');

    return { ...user, fullName, userID };
  } else {
    return null;
  }
};

// memoizeOne only caches latest arguments so we do not end up
// with a massive cache to invalidate. For multiple messages
// from the same author, the cache will return on each call.
// This caching is something we should be aware of if we end
// up supporting user status at some point.
const getMessageAuthorDetails = memoizeOne(authorDetails);

export { getMessageAuthorDetails };
