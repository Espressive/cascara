import React from 'react';
import Chat from '../Chat';
import convo from '../json/conversation1';

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

// const basicMsgs = [
//   {
//     key: 'poo',
//     text: 'hey',
//     type: 'message',
//   },
// ];

// const messages = [
//   {
//     attached: 'top',
//     contentPosition: 'end',
//     key: 'message-id-1',
//     message: (
//       <FUIChat.Message
//         author='John Doe'
//         content='Hello'
//         mine
//         timestamp='Yesterday, 10:15 PM'
//       />
//     ),
//   },
//   {
//     attached: true,
//     contentPosition: 'end',
//     key: 'message-id-2',
//     message: (
//       <FUIChat.Message
//         author='John Doe'
//         content="I'm back!"
//         mine
//         timestamp='Yesterday, 10:15 PM'
//       />
//     ),
//   },
//   {
//     attached: 'bottom',
//     contentPosition: 'end',
//     key: 'message-id-3',
//     message: (
//       <FUIChat.Message
//         author='John Doe'
//         content={{
//           content: (
//             <div>
//               What do you think about <a href='#'>www.goodFood.com</a>?
//             </div>
//           ),
//         }}
//         mine
//         timestamp='Yesterday, 10:15 PM'
//       />
//     ),
//   },
//   {
//     attached: 'top',
//     gutter: <Avatar {...users[7]} />,
//     key: 'message-id-4',
//     message: (
//       <FUIChat.Message
//         author={getAuthorName(7)}
//         content='Hi'
//         timestamp='Yesterday, 10:15 PM'
//       />
//     ),
//   },
//   {
//     attached: true,
//     gutter: <Avatar {...users[7]} />,
//     key: 'message-id-5',
//     message: (
//       <FUIChat.Message
//         author={getAuthorName(7)}
//         content='Looks good!'
//         timestamp='Yesterday, 10:15 PM'
//       />
//     ),
//   },
//   {
//     attached: 'bottom',
//     gutter: <Avatar {...users[7]} />,
//     key: 'message-id-6',
//     message: (
//       <FUIChat.Message
//         author={getAuthorName(7)}
//         content={
//           <div>
//             I also like <a href='#'>www.goodFood2.com</a>.
//           </div>
//         }
//         timestamp='Yesterday, 10:15 PM'
//       />
//     ),
//   },
//   {
//     contentPosition: 'end',
//     key: 'message-id-7',
//     message: (
//       <FUIChat.Message
//         author='John Doe'
//         content='Would you like to grab lunch there?'
//         mine
//         timestamp='Yesterday, 10:16 PM'
//       />
//     ),
//   },
//   {
//     gutter: <Avatar {...users[7]} />,
//     key: 'message-id-8',
//     message: (
//       <FUIChat.Message
//         author={getAuthorName(7)}
//         content="Sure! Let's try it."
//         timestamp='Yesterday, 10:15 PM'
//       />
//     ),
//   },
//   {
//     children: <Divider color='brand' content='Today' important />,
//     key: 'message-id-9',
//   },
//   {
//     contentPosition: 'end',
//     key: 'message-id-10',
//     message: (
//       <FUIChat.Message
//         author='John Doe'
//         content="Ok, let's go."
//         mine
//         timestamp='Today, 11:15 PM'
//       />
//     ),
//   },
// ];

const messages = convo.results.reverse().map((message) => ({
  ...message,
  timestamp: new Date(message.sys_date_created).toLocaleString(),
}));

const ChatPublicAPI = () => (
  <Chat currentUserID={3} messages={messages} users={users} />
);

export default ChatPublicAPI;
