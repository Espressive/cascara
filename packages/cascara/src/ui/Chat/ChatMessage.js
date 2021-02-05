import React from 'react';
import pt from 'prop-types';
// import t from 'tcomb';
import { Chat as FUIChat } from '@fluentui/react-northstar';
// import tcombErrorMessage from '../../shared/tcombErrorMessage';
import {
  getSharedMessageKeys,
  getTranslatedDetails,
  validateMessageObj,
} from './utils';

const propTypes = {
  authorName: pt.string,
  isSessionUser: pt.bool,
  isTranslated: pt.bool,
  text: pt.oneOfType([pt.string, pt.node, pt.arrayOf(pt.node)]),
  timestamp: pt.string.isRequired,
};

const ChatMessage = ({
  authorName,
  isSessionUser = false,
  isTranslated,
  text,
  timestamp,
}) => {
  return (
    <FUIChat.Message
      author={authorName}
      content={text}
      details={getTranslatedDetails(isTranslated)}
      mine={isSessionUser}
      timestamp={timestamp}
    />
  );
};
ChatMessage.displayName = 'Chat.Message';
ChatMessage.propTypes = propTypes;

const objPropTypes = {
  isSessionUser: pt.bool,
  isTranslated: pt.bool,
  message: pt.object.isRequired,
  messageAuthor: pt.object.isRequired,
  ref: pt.object.isRequired,
};

// This returns the object that FUI is expecting, along with the component and props
const getChatMessageObj = (obj) => {
  const { isSessionUser, isTranslated, message, messageAuthor, ref } = obj;

  validateMessageObj(objPropTypes, obj, ChatMessage.displayName);

  return {
    ...getSharedMessageKeys(obj),
    message: (
      <span id={message.id} ref={ref}>
        <ChatMessage
          {...message}
          authorName={messageAuthor.fullName}
          id={message.id}
          isSessionUser={isSessionUser}
          isTranslated={isTranslated}
        />
      </span>
    ),
  };
};

export { getChatMessageObj };

export default ChatMessage;
