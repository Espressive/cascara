import React from 'react';
import pt from 'prop-types';
import { Animation, Divider, Ref } from '@fluentui/react-northstar';
import { validateMessageObj } from './utils';
import { Boundaries } from '../../atoms';

const propTypes = {
  text: pt.oneOfType([pt.string, pt.node, pt.arrayOf(pt.node)]),
};

/** A Chat can display a system message */
const ChatSystem = ({ text }) => (
  <Animation name='chatMessage'>
    <Divider color='brand' content={text} important />
  </Animation>
);

ChatSystem.displayName = 'Chat.System';
ChatSystem.propTypes = propTypes;

const objPropTypes = {
  message: pt.object.isRequired,
  ref: pt.object.isRequired,
};

// This returns the object that FUI is expecting, along with the component and props
const getChatSystemObj = (obj) => {
  const { message, ref } = obj;

  validateMessageObj(objPropTypes, obj, ChatSystem.displayName);

  return {
    // NOTE: System messages are expected to be returned as children, not as a `message` key
    children: (
      <Boundaries>
        <Ref id={message.id} innerRef={ref}>
          <ChatSystem {...message} />
        </Ref>
      </Boundaries>
    ),
    key: message.id,
  };
};

export { getChatSystemObj };

export default ChatSystem;
