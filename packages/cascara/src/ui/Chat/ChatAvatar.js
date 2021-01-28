import React from 'react';
import { Avatar as FUIAvatar } from '@fluentui/react-northstar';

// NOTE: Status will need to be coming from enumerated object values at some point
const ChatAvatar = ({ fullName, status, imageUrl }) => (
  <FUIAvatar image={imageUrl} name={fullName} status={status} />
);

ChatAvatar.displayName = 'Chat.Avatar';

export default ChatAvatar;
