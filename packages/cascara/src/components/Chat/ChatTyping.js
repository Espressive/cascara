import React from 'react';
import pt from 'prop-types';
import {
  Animation,
  Chat as FUIChat,
  Provider,
  Ref,
} from '@fluentui/react-northstar';
import { MoreIcon } from '@fluentui/react-icons-northstar';
import Boundaries from '../../atoms/Boundaries';

import { getSharedMessageKeys, validateMessageObj } from './utils';
import { wiggle } from '../../animations';

const propTypes = {
  isSessionUser: pt.bool,
};

const handleMoreIconClick = ({ theme: { siteVariables } }) => {
  return {
    color: siteVariables?.colorScheme?.brand?.foreground,
  };
};

/** A Chat can display an indicator that typing is happening */
const ChatTyping = ({ isSessionUser = false }) => (
  <Boundaries>
    <Animation name='chatMessage'>
      <FUIChat.Message
        content={
          <Provider
            theme={{
              animations: {
                wiggle,
              },
            }}
          >
            <Animation name='wiggle'>
              <MoreIcon size='larger' styles={handleMoreIconClick} />
            </Animation>
          </Provider>
        }
        mine={isSessionUser}
        style={{ minWidth: 'auto' }}
      />
    </Animation>
  </Boundaries>
);

ChatTyping.displayName = 'Chat.Typing';
ChatTyping.propTypes = propTypes;

const objPropTypes = {
  isSessionUser: pt.bool,
  message: pt.object.isRequired,
  messageAuthor: pt.object.isRequired,
  ref: pt.object.isRequired,
};

// This returns the object that FUI is expecting, along with the component and props
const getChatTypingObj = (obj) => {
  const { isSessionUser, message, messageAuthor, ref } = obj;

  validateMessageObj(objPropTypes, obj, ChatTyping.displayName);

  return {
    ...getSharedMessageKeys(obj),
    message: (
      <Ref id={message.id} innerRef={ref}>
        <ChatTyping
          {...message}
          authorName={messageAuthor?.fullName}
          isSessionUser={isSessionUser}
        />
      </Ref>
    ),
  };
};

getChatTypingObj.propTypes = {
  testShit: pt.bool.isRequired,
};

export { getChatTypingObj };

export default ChatTyping;
