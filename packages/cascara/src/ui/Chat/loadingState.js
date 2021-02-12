const loadingMessages = [
  {
    id: '1',
    sys_date_created: '2020-06-29T21:17:06.670690Z',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, dolore!',
    timestamp: '',
    type: 'message',
    user_id: 'a',
  },
  {
    id: '2',
    sys_date_created: '2020-06-29T21:17:06.670690Z',
    text: 'Lorem ipsum dolor sit amet.',
    timestamp: '',
    type: 'message',
  },
  {
    id: '3',
    sys_date_created: '2020-06-29T21:17:06.670690Z',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit facilis hic soluta porro? Sequi cumque quasi expedita omnis?',
    timestamp: '',
    type: 'message',
  },
  {
    id: '4',
    sys_date_created: '2020-06-29T21:17:06.670690Z',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    timestamp: '',
    type: 'message',
    user_id: 'a',
  },
  {
    id: '5',
    sys_date_created: '2020-06-29T21:17:06.670690Z',
    text: 'Lorem ipsum dolor sit.',
    timestamp: '',
    type: 'message',
  },
  {
    id: '6',
    sys_date_created: '2020-06-29T21:17:06.670690Z',
    text: 'Lorem ipsum dolor sit amet.',
    timestamp: '',
    type: 'message',
    user_id: 'a',
  },
  {
    id: '7',
    sys_date_created: '2020-06-29T21:17:06.670690Z',
    text: 'Lorem, ipsum.',
    timestamp: '',
    type: 'message',
    user_id: 'a',
  },
  {
    id: '8',
    sys_date_created: '2020-06-29T21:17:06.670690Z',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    timestamp: '',
    type: 'message',
    user_id: 'a',
  },
];

const loadingTheme = {
  // componentStyles: {
  //   Avatar: ({ colorScheme }) => ({
  //     image: {
  //       backgroundColor: 'red',
  //       opacity: 0,
  //     },
  //   }),
  //   Text: ({ colorScheme }) => ({
  //     root: {
  //       backgroundColor: colorScheme.default.background3,
  //       color: 'red',
  //       opacity: 0,
  //     },
  //   }),
  // },
  componentVariables: {
    ChatMessage: ({ colorScheme }) => ({
      backgroundColor: colorScheme.default.background3,
      backgroundColorMine: colorScheme.default.background3,
      contentColor: colorScheme.default.background3,
      iconBackgroundColor: colorScheme.default.background3,
    }),
  },
};

export { loadingMessages, loadingTheme };
