import React from 'react';
import {
  Button,
  Dropdown,
  Chat as FUIChat,
  Flex,
} from '@fluentui/react-northstar';
import { getChatMessageObj } from './ChatMessage';
import getSharedMessageKeys from './getSharedMessageKeys';

const ChatButtons = ({
  authorName,
  isSessionUser,
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
          placeholder='Select one...'
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

// This returns the object that FUI is expecting, along with the component and props
const getChatButtonsObj = (obj) => {
  const { isSessionUser, message, messageAuthor } = obj;

  // NOTE: We are returning an array of objects here. This works because Chat will do a flatMap
  // on all arrays and return their objects.
  return [
    // This is getting a ChatMessage object and returning it to display "text" before our buttons
    getChatMessageObj(obj),
    {
      ...getSharedMessageKeys(obj),
      key: message.id + '_buttons',
      message: (
        <ChatButtons
          authorName={messageAuthor.fullName}
          isSessionUser={isSessionUser}
          {...message}
        />
      ),
    },
  ];
};

export { getChatButtonsObj };

export default ChatButtons;
