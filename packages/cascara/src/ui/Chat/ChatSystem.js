import React from 'react';
import { Divider } from '@fluentui/react-northstar';

const System = ({ text }) => <Divider color='brand' content={text} important />;

System.displayName = 'Chat.System';

// This returns the object that FUI is expecting, along with the component and props
const chatSystem = ({ message }) => {
  return {
    // NOTE: System messages are expected to be returned as children, not as a `message`
    children: <System {...message} />,
    key: message.id,
  };
};

export default chatSystem;
