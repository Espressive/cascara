import React from 'react';
import pt from 'prop-types';
import {
  Button,
  Dropdown,
  Chat as FUIChat,
  Flex,
  Ref,
} from '@fluentui/react-northstar';
import { getChatMessageObj } from './ChatMessage';
import { getSharedMessageKeys, validateMessageObj } from './utils';

const propTypes = {
  authorName: pt.string,
  isSessionUser: pt.bool,
  options: pt.arrayOf(
    pt.shape({
      content: pt.string.isRequired,
      key: pt.string.isRequired,
      onClick: pt.func.isRequired,
    })
  ).isRequired,
  timestamp: pt.string.isRequired,
};

const ChatButtons = ({
  authorName,
  isSessionUser = false,
  options = [],
  timestamp,
}) => (
  <FUIChat.Message
    author={authorName}
    content={
      options.length > 3 ? (
        <Dropdown
          itemToString={(value) => value.content}
          items={options.map((option, i) => ({
            ...option,
          }))}
          noResultsMessage="We couldn't find any matches."
          placeholder='Select an option...'
        />
      ) : (
        <Flex column gap='gap.small'>
          {options.map((option) => (
            <Button {...option} fluid />
          ))}
        </Flex>
      )
    }
    mine={isSessionUser}
    timestamp={timestamp}
  />
);

ChatButtons.displayName = 'Chat.Buttons';
ChatButtons.propTypes = propTypes;

const objPropTypes = {
  isSessionUser: pt.bool,
  message: pt.object.isRequired,
  messageAuthor: pt.object.isRequired,
  ref: pt.object.isRequired,
};

// This returns the object that FUI is expecting, along with the component and props
const getChatButtonsObj = (obj) => {
  const { isSessionUser, message, messageAuthor, ref } = obj;

  validateMessageObj(objPropTypes, obj, ChatButtons.displayName);

  // NOTE: We are returning an array of objects here. This works because Chat will do a flatMap
  // on all arrays and return their objects.
  return [
    // This is getting a ChatMessage object and returning it to display "text" before our buttons
    getChatMessageObj(obj),
    {
      ...getSharedMessageKeys(obj),
      key: message.id + '_buttons',
      message: (
        <Ref id={message.id} innerRef={ref}>
          <ChatButtons
            {...message}
            authorName={messageAuthor.fullName}
            isSessionUser={isSessionUser}
          />
        </Ref>
      ),
    },
  ];
};

export { getChatButtonsObj };

export default ChatButtons;
