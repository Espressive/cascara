import { getChatAttachmentObj } from './ChatAttachment';
import { getChatButtonsObj } from './ChatButtons';
import { getChatMessageObj } from './ChatMessage';
import { getChatSystemObj } from './ChatSystem';
import { getChatTypingObj } from './ChatTyping';
import { getChatWidgetObj } from './ChatWidget';

const messageTypes = {
  attachment: getChatAttachmentObj,
  buttons: getChatButtonsObj,
  message: getChatMessageObj,
  system: getChatSystemObj,
  typing: getChatTypingObj,
  widget: getChatWidgetObj,
};

export default messageTypes;
