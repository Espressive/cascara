import React from 'react';
import { Chat as FUIChat, Image } from '@fluentui/react-northstar';

import ChatAvatar from './ChatAvatar';

// There will be other attachment types we need to add support for. Some
// attachment display components may need additional logic to set the
// parent FUIChat.Message component props in a different way or adjust styles.
const attachmentTypes = {
  gif: Image,
  png: Image,
};

const Attachment = ({ authorName, isSessionUser, metadata, timestamp }) => {
  const Component = attachmentTypes[metadata.type];

  if (Component) {
    return (
      <FUIChat.Message
        author={authorName}
        content={<Component fluid src={metadata.url} />}
        mine={isSessionUser}
        timestamp={timestamp}
      />
    );
  } else {
    // eslint-disable-next-line no-console
    console.error('Unsupported attachment: ' + metadata.type);
    return null;
  }
};

Attachment.displayName = 'Chat.Message';

// This returns the object that FUI is expecting, along with the component and props
const chatAttachment = ({
  attached,
  isSessionUser,
  message,
  messageAuthor,
}) => {
  return {
    attached,
    contentPosition: isSessionUser ? 'end' : 'start',
    gutter: <ChatAvatar {...messageAuthor} />,
    key: message.id,
    message: (
      <Attachment
        authorName={messageAuthor.fullName}
        isSessionUser={isSessionUser}
        {...message}
      />
    ),
  };
};

export default chatAttachment;
