import React, { useCallback } from 'react';
import pt from 'prop-types';
import { Animation, Chat as FUIChat, Ref } from '@fluentui/react-northstar';
import { getChatMessageObj } from './ChatMessage';
import Boundaries from '../../atoms/Boundaries';
import { getSharedMessageKeys, validateMessageObj } from './utils';
import { DatePicker } from 'antd';

const propTypes = {
  authorName: pt.string,
  isSessionUser: pt.bool,
  timestamp: pt.string.isRequired,
};

/** A Chat can display options as either buttons or a dropdown select if more than 3 options exist */
const ChatDate = ({ authorName, isSessionUser = false, timestamp }) => {
  const handleOnChange = useCallback((date, dateString) => {
    // eslint-disable-next-line no-console -- d
    console.log({ date, dateString });
  }, []);

  return (
    <Boundaries>
      <Animation name='chatMessage'>
        <FUIChat.Message
          author={authorName}
          content={<DatePicker onChange={handleOnChange} />}
          mine={isSessionUser}
          timestamp={timestamp}
        />
      </Animation>
    </Boundaries>
  );
};

ChatDate.displayName = 'Chat.Options';
ChatDate.propTypes = propTypes;

const objPropTypes = {
  isSessionUser: pt.bool,
  message: pt.object.isRequired,
  messageAuthor: pt.object.isRequired,
  ref: pt.object.isRequired,
};

// This returns the object that FUI is expecting, along with the component and props
const getChatDateObj = (obj) => {
  const { isSessionUser, message, messageAuthor, ref } = obj;

  validateMessageObj(objPropTypes, obj, ChatDate.displayName);

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
          <ChatDate
            {...message}
            authorName={messageAuthor?.fullName}
            isSessionUser={isSessionUser}
          />
        </Ref>
      ),
    },
  ];
};

export { getChatDateObj };

export default ChatDate;
