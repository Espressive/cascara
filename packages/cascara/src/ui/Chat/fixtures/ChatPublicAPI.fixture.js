import React from 'react';
import Chat, { ChatProvider } from '../';
import {
  Button,
  Flex,
  Provider,
  teamsTheme,
  TextArea,
} from '@fluentui/react-northstar';
import { getNormalizedMessages } from './utils';

import { results as convo0 } from '../json/conversation0';
import { results as convo1 } from '../json/conversation1';

const teamsCommentsTheme = {
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
    imageUrl:
      'https://www.arsenal.com/sites/default/files/styles/player_listing_image_400x252/public/images/Tierney_1045x658.jpg',
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

const teamsChatInput = (
  <Flex gap='gap.small'>
    <TextArea fluid placeholder='Post a comment...' />
    <Button content='Post' />
  </Flex>
);

const ChatPublicAPI = (
  <ChatProvider inputComponent={teamsChatInput} isThemeSelectable>
    <Chat
      messages={getNormalizedMessages(convo1)}
      sessionUserID={3}
      users={users}
    />
  </ChatProvider>
);

const ChatNoUsers = (
  <ChatProvider>
    <Chat messages={getNormalizedMessages(convo1)} sessionUserID={3} />
  </ChatProvider>
);

const ChatNoMessages = (
  <ChatProvider isThemeSelectable>
    <Chat />
  </ChatProvider>
);

const TeamsChatExample = (
  <Provider style={{ height: '100vh' }} theme={teamsTheme}>
    <Provider style={{ height: '100%' }} theme={teamsCommentsTheme}>
      <Flex column gap='gap.small' style={{ maxHeight: '100%' }}>
        <div
          style={{
            overflowY: 'auto',
          }}
        >
          <Chat messages={getNormalizedMessages(convo0)} users={users} />
        </div>
        {teamsChatInput}
      </Flex>
    </Provider>
  </Provider>
);

export default {
  default: ChatPublicAPI,
  no_messages: ChatNoMessages,
  no_users: ChatNoUsers,
  teams: TeamsChatExample,
};
