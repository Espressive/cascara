import React from 'react';
import pt from 'prop-types';
import { Ref } from '@fluentui/react-northstar';
import { validateMessageObj } from '../utils';
import SupportFeedback from './SupportFeedback';
import TicketResolved from './TicketResolved';

const SYSTEM_WIDGET_TYPES = {
  'Support Feedback': SupportFeedback,
  'Ticket Resolved Survey': TicketResolved,
};

const propTypes = {
  metadata: pt.shape({
    widget: pt.shape({
      widget: pt.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const ChatWidget = (props) => {
  const { metadata } = props;
  const systemWidget = metadata.widget.widget;
  const Widget = SYSTEM_WIDGET_TYPES[systemWidget];

  return <Widget {...props} />;
};

ChatWidget.propTypes = propTypes;

const objPropTypes = {
  isSessionUser: pt.bool,
  message: pt.object.isRequired,
  messageAuthor: pt.object.isRequired,
  ref: pt.object.isRequired,
};

const getChatWidgetObj = (obj) => {
  const { isSessionUser, message, messageAuthor, ref } = obj;

  validateMessageObj(objPropTypes, obj, 'Widget');

  // System widgets should not include a user_id or they will break message grouping.
  // This message may need to be separated to throw errors on other components like
  // system type messages
  if (message.user_id !== (undefined || null)) {
    // eslint-disable-next-line no-console -- this is needed as a developer message
    console.error('System widgets should not include a `user_id` key.');
  }
  return {
    // NOTE: System messages are expected to be returned as children, not as a `message` key
    children: (
      <Ref id={message.id} innerRef={ref}>
        <ChatWidget
          authorName={messageAuthor?.fullName}
          isSessionUser={isSessionUser}
          {...message}
        />
      </Ref>
    ),
    key: message.id,
  };
};

export { getChatWidgetObj };

export default ChatWidget;
