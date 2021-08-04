import React, { useCallback } from 'react';
import pt from 'prop-types';
import {
  Animation,
  Button,
  Dropdown,
  Flex,
  Chat as FUIChat,
  Ref,
} from '@fluentui/react-northstar';
import { getChatMessageObj } from './ChatMessage';
import ErrorBoundary from '../../private/ErrorBoundary';
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

/** A Chat can display options as either buttons or a dropdown select if more than 3 options exist */
const ChatOptions = ({
  authorName,
  isSessionUser = false,
  options = [],
  timestamp,
}) => {
  const itemToString = useCallback((value) => {
    return value?.content;
  }, []);

  return (
    <ErrorBoundary>
      <Animation name='chatMessage'>
        <FUIChat.Message
          author={authorName}
          content={
            options.length > 3 ? (
              <Dropdown
                itemToString={itemToString}
                items={options.map((option, i) => ({
                  ...option,
                }))}
                noResultsMessage="We couldn't find any matches."
                placeholder='Select an option...'
              />
            ) : (
              <Flex column gap='gap.small'>
                {options.map((option) => (
                  <Button {...option} fluid key={option.key} />
                ))}
              </Flex>
            )
          }
          mine={isSessionUser}
          timestamp={timestamp}
        />
      </Animation>
    </ErrorBoundary>
  );
};

ChatOptions.displayName = 'Chat.Options';
ChatOptions.propTypes = propTypes;

const objPropTypes = {
  isSessionUser: pt.bool,
  message: pt.object.isRequired,
  messageAuthor: pt.object.isRequired,
  ref: pt.object.isRequired,
};

// This returns the object that FUI is expecting, along with the component and props
const getChatOptionsObj = (obj) => {
  const { isSessionUser, message, messageAuthor, ref } = obj;

  validateMessageObj(objPropTypes, obj, ChatOptions.displayName);

  // NOTE: We are returning an array of objects here. This works because Chat will do a flatMap
  // on all arrays and return their objects.
  return [
    // This is getting a ChatMessage object and returning it to display "text" before our buttons
    getChatMessageObj(obj),
    {
      ...getSharedMessageKeys(obj),
      key: `${message.id}_buttons`,
      message: (
        <Ref id={message.id} innerRef={ref}>
          <ChatOptions
            {...message}
            authorName={messageAuthor?.fullName}
            isSessionUser={isSessionUser}
          />
        </Ref>
      ),
    },
  ];
};

export { getChatOptionsObj };

export default ChatOptions;
