import React from 'react';
import pt from 'prop-types';
import {
  Attachment,
  Chat as FUIChat,
  Image,
  Ref,
} from '@fluentui/react-northstar';
import { FilesEmptyIcon } from '@fluentui/react-icons-northstar';
import { bytesToSize, getSharedMessageKeys, validateMessageObj } from './utils';

const IMAGE_ATTACHMENT_TYPES = ['gif', 'jpeg', 'jpg', 'png', 'svg', 'tiff'];

const propTypes = {
  authorName: pt.string,
  handleScrollToLatestMessage: pt.func.isRequired,
  isSessionUser: pt.bool,
  metadata: pt.object.isRequired,
  timestamp: pt.string.isRequired,
};

const ChatAttachment = ({
  authorName,
  handleScrollToLatestMessage,
  isSessionUser = false,
  metadata,
  timestamp,
}) => {
  const { url, size, width, height, type } = metadata;
  const fileName = url.split('/').pop();
  // const fileExtension = fileName.split('.').pop();

  // TODO: Make the file download when clicked
  const handleDownload = () => {
    alert('handleDownload()');
  };

  const attachment = IMAGE_ATTACHMENT_TYPES.includes(metadata.type) ? (
    // Display an image if one of the supported image attachment types is present
    // NOTE: For now, we are passing the scroll bottom handler to all onLoad events for an image,
    // this way we can make sure the bottom gets scrolled to when the image is done loading.
    <Image
      fluid
      height={height}
      onLoad={handleScrollToLatestMessage}
      src={url}
      width={width}
    />
  ) : (
    // Otherwise, display as a file instead
    <Attachment
      actionable
      description={bytesToSize(size)}
      header={fileName}
      icon={
        // TODO: Extract these to CSS modules
        <div
          style={{
            position: 'relative',
          }}
        >
          <div
            style={{
              bottom: '.375em',
              fontSize: '.75em',
              position: 'absolute',
              textAlign: 'center',
              width: '100%',
              zIndex: 1,
            }}
          >
            {type}
          </div>
          <FilesEmptyIcon outline />
        </div>
      }
      onClick={handleDownload}
    />
  );

  return (
    <FUIChat.Message
      author={authorName}
      content={attachment}
      mine={isSessionUser}
      timestamp={timestamp}
    />
  );
};

ChatAttachment.displayName = 'Chat.Attachment';
ChatAttachment.propTypes = propTypes;

const objPropTypes = {
  handleScrollToLatestMessage: pt.func.isRequired,
  isSessionUser: pt.bool,
  message: pt.object.isRequired,
  messageAuthor: pt.object.isRequired,
  ref: pt.object.isRequired,
};

// This returns the object that FUI is expecting, along with the component and props
const getChatAttachmentObj = (obj) => {
  const {
    handleScrollToLatestMessage,
    isSessionUser,
    message,
    messageAuthor,
    ref,
  } = obj;

  validateMessageObj(objPropTypes, obj, ChatAttachment.displayName);

  return {
    ...getSharedMessageKeys(obj),
    message: (
      <Ref id={message.id} innerRef={ref}>
        <ChatAttachment
          {...message}
          authorName={messageAuthor.fullName}
          handleScrollToLatestMessage={handleScrollToLatestMessage}
          isSessionUser={isSessionUser}
        />
      </Ref>
    ),
  };
};

export { getChatAttachmentObj };

export default ChatAttachment;
