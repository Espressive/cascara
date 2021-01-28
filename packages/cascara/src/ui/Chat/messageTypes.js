import ChatMessage from './ChatMessage';
import ChatSystem from './ChatSystem';
import ChatAttachment from './ChatAttachment';

const messageTypes = {
  attachment: ChatAttachment,
  message: ChatMessage,
  system: ChatSystem,
};

export default messageTypes;
