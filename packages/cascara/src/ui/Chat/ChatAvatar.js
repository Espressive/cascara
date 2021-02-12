import React from 'react';
import pt from 'prop-types';
import { Animation, Avatar as FUIAvatar } from '@fluentui/react-northstar';

const propTypes = {
  fullName: pt.string,
  imageUrl: pt.string,
  square: pt.bool,
  status: pt.object,
  userID: pt.number,
};

// NOTE: Status will need to be coming from enumerated object values at some point
const ChatAvatar = ({ fullName, imageUrl, square, status, userID }) => (
  <Animation name='chatMessage'>
    <FUIAvatar
      image={imageUrl}
      name={fullName}
      square={square ? square : userID === 0} // Make the display square for Barista
      status={status}
    />
  </Animation>
);

ChatAvatar.displayName = 'Chat.Avatar';
ChatAvatar.propTypes = propTypes;

export default ChatAvatar;
