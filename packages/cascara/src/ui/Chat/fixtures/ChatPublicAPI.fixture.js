import React, { Fragment } from 'react';
import Chat from '../Chat';
import {
  Button,
  Flex,
  Provider,
  TextArea,
  teamsTheme,
} from '@fluentui/react-northstar';
import convo from '../json/conversation1';

const commentsTheme = {
  componentStyles: {
    ChatItem: {
      message: { marginRight: 0 },
    },
  },
  componentVariables: {
    Chat: { backgroundColor: 'transparent' },
    ChatMessage: {
      backgroundColor: 'transparent',
      backgroundColorMine: 'transparent',
      offset: 0,
      padding: 0,
    },
  },
};

const users = {
  0: {
    firstName: 'Barista',
    imageUrl:
      'https://www.espressive.com/wp-content/uploads/2018/07/barista-notalk-bubble.png',
    status: {
      color: 'green',
    },
  },
  3: {
    firstName: 'Kieran',
    lastName: 'Tierney',
  },
  7: {
    firstName: 'Danielle',
    imageUrl:
      'https://www.arsenal.com/sites/default/files/styles/player_listing_image_400x252/public/images/VandeDonk2_1045x658.jpg',
    lastName: 'Van de Donk',
  },
  9: {
    firstName: 'Alexandre',
    imageUrl:
      'https://www.arsenal.com/sites/default/files/styles/player_listing_image_400x252/public/images/Lacazette_1045x658_1.jpg',
    lastName: 'Lacazette',
  },
};

const getOptionsObjects = (options) =>
  options?.map(({ actual_text, eid, label, ...rest }) => {
    // console.table(rest);
    const onClick = () => alert(actual_text);
    return {
      content: label,
      key: eid,
      onClick,
    };
  });

// This is a test function but should basically do what EspMetaVariables does
// as there is no business logic in these Chat components for displaying any
// kind of markdown or whitespace.
const messageReplacement = (text) => {
  let msg = text;

  // Add line break tags for each newline
  msg = msg.split('\n').map((item, i) => (
    <Fragment key={i}>
      {item}
      <br />
    </Fragment>
  ));

  return msg;
};

// We need to take the array of message objects and modify it to match the
// API of our Chat component. This business logic should not exist inside
// of the chat component. If we do not want to display a message, we should
// not pass an object into the Chat component itself. It is possible that
// there should be a filter step after the array of messages is returned
// which we can use to remove message objects from being passed.
const messages = convo.results
  .map((message) => {
    // There are some scenarios where we need to change the message type
    // to match our message components. This flat map can be extended with
    // more types if needed.
    const customMessageTypes = {
      buttons: (msg) =>
        Boolean(msg.type === 'message' && msg?.metadata?.user_input?.select),
      widget: (msg) => Boolean(msg?.metadata?.widget),
    };

    let type = message.type; // Every message will start off with the initial system type
    let options; // Not all messages will utilize options arrays

    // We have some unique scenarios where we want to change the type for
    // the Chat component to display something differently
    for (const [key, testFunc] of Object.entries(customMessageTypes)) {
      if (testFunc(message)) {
        type = key;
        // Most messages do not use options, so we do not want to try to calculate
        // them unless they are one of our custom types
        options = getOptionsObjects(message?.metadata?.user_input?.select);
      }
    }

    return {
      ...message,
      options,
      text: message.text ? messageReplacement(message.text) : undefined,
      timestamp: message.sys_date_created
        ? new Date(message.sys_date_created).toLocaleString()
        : undefined,
      type,
    };
  })
  .reverse();

const ChatPublicAPI = (
  <Provider
    style={{
      height: '100vh',
      padding: '1em',
    }}
    theme={teamsTheme}
  >
    <Provider theme={commentsTheme}>
      {/* <button>Teams Theme</button>
      <button>Barista Theme</button> */}
      <div
        style={{
          maxHeight: 'calc(100vh - 48px - 3em)',
          overflowY: 'auto',
        }}
      >
        <Chat currentUserID={null} messages={messages} users={users} />
      </div>
      <Flex gap='gap.small' style={{ marginTop: '1em' }}>
        <TextArea fluid placeholder='Post a comment...' />
        <Button content='Post' />
      </Flex>
    </Provider>
  </Provider>
);

export default ChatPublicAPI;
