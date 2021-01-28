import React from 'react';
import Chat from '../Chat';
import convo from '../json/conversation2';

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
      'https://www.arsenal.com/sites/default/files/styles/player_listing_image_400x252/public/images/Tierney_1045x658_0.jpg',
    lastName: 'Tierney',
    status: {
      color: 'green',
    },
  },
  7: {
    firstName: 'Danielle',
    imageUrl:
      'https://www.arsenal.com/sites/default/files/styles/player_listing_image_400x252/public/images/VandeDonk2_1045x658.jpg',
    lastName: 'Van de Donk',
    status: {
      color: 'green',
    },
  },
  9: {
    firstName: 'Alexandre',
    imageUrl:
      'https://www.arsenal.com/sites/default/files/styles/player_listing_image_400x252/public/images/Lacazette_1045x658_1.jpg',
    lastName: 'Lacazette',
    status: {
      color: 'green',
    },
  },
};

const messages = convo.results.reverse().map((message) => ({
  ...message,
  timestamp: new Date(message.sys_date_created).toLocaleString(),
}));

const ChatPublicAPI = () => (
  <Chat currentUserID={3} messages={messages} users={users} />
);

export default ChatPublicAPI;
