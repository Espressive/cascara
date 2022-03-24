import { getChatAttachmentObj } from './ChatAttachment';
import { getChatOptionsObj } from './ChatOptions';
import { getChatMessageObj } from './ChatMessage';
import { getChatSystemObj } from './ChatSystem';
import { getChatTypingObj } from './ChatTyping';
import { getChatWidgetObj } from './ChatWidget';
import { getChatDateObj } from './ChatDate';

const messageTypes = {
  attachment: getChatAttachmentObj,
  date: getChatDateObj,
  message: getChatMessageObj,
  options: getChatOptionsObj,
  system: getChatSystemObj,
  typing: getChatTypingObj,
  widget: getChatWidgetObj,
};

export default messageTypes;
