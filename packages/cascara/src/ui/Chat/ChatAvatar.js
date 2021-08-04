import React from 'react';
import pt from 'prop-types';
import { Animation, Avatar as FUIAvatar } from '@fluentui/react-northstar';
import ErrorBoundary from '../../private/ErrorBoundary';

const propTypes = {
  fullName: pt.string,
  imageUrl: pt.string,
  square: pt.bool,
  status: pt.shape({
    accessibility: pt.string,
    color: pt.string,
    icon: pt.oneOf(['success', 'info', 'warning', 'error', 'unknown']),
    size: pt.oneOf([
      'smallest',
      'smaller',
      'small',
      'medium',
      'large',
      'larger',
      'largest',
    ]),
    state: pt.oneOf(['success', 'info', 'warning', 'error', 'unknown']),
  }),
  userID: pt.number,
};

// NOTE: Status will need to be coming from enumerated object values at some point
const ChatAvatar = ({ fullName, imageUrl, square, status, userID }) => (
  <ErrorBoundary>
    <Animation name='chatMessage'>
      <FUIAvatar
        image={imageUrl}
        name={fullName}
        square={square ? square : userID === 0} // Make the display square for Barista
        status={status}
      />
    </Animation>
  </ErrorBoundary>
);

ChatAvatar.displayName = 'Chat.Avatar';
ChatAvatar.propTypes = propTypes;

export default ChatAvatar;
