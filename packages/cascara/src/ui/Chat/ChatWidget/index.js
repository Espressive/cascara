import React from 'react';
import SupportFeedback from './SupportFeedback';
import TicketResolved from './TicketResolved';

const systemWidgetTypes = {
  'Support Feedback': SupportFeedback,
  'Ticket Resolved Survey': TicketResolved,
};

const ChatWidget = (message) => {
  const systemWidget = message.metadata.widget.widget;
  const Widget = systemWidgetTypes[systemWidget];

  return <Widget {...message} />;
};

const getChatWidgetObj = (obj) => {
  const { isSessionUser, message, messageAuthor } = obj;

  // System widgets should not include a user_id or they will break message grouping.
  // This message may need to be separated to throw errors on other components like
  // system type messages
  if (message.user_id !== (undefined || null)) {
    // eslint-disable-next-line no-console
    console.error('System widgets should not include a `user_id` key.');
  }
  return {
    // NOTE: System messages are expected to be returned as children, not as a `message` key
    children: (
      <ChatWidget
        authorName={messageAuthor.fullName}
        isSessionUser={isSessionUser}
        {...message}
      />
    ),
    key: message.id,
  };
};

export { getChatWidgetObj };

export default ChatWidget;
