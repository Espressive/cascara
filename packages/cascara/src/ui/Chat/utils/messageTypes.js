import { getChatAttachmentObj } from '../ChatAttachment';
import { getChatOptionsObj } from '../ChatOptions';
import { getChatMessageObj } from '../ChatMessage';
import { getChatSystemObj } from '../ChatSystem';
import { getChatTypingObj } from '../ChatTyping';
import { getChatWidgetObj } from '../ChatWidget';

const messageTypes = {
  attachment: getChatAttachmentObj,
  message: getChatMessageObj,
  options: getChatOptionsObj,
  system: getChatSystemObj,
  typing: getChatTypingObj,
  widget: getChatWidgetObj,
};

export { messageTypes };
