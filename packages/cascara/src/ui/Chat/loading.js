import { loading } from '../../animations';

const loadingMessages = [
  {
    id: '1',
    sys_date_created: '2020-06-29T21:17:06.670690Z',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, dolore!',
    type: 'message',
    user_id: 'a',
  },
  {
    id: '2',
    sys_date_created: '2020-06-29T21:17:06.670690Z',
    text: 'Lorem ipsum dolor sit amet.',
    type: 'message',
  },
  {
    id: '3',
    sys_date_created: '2020-06-29T21:17:06.670690Z',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit facilis hic soluta porro? Sequi cumque quasi expedita omnis?',
    type: 'message',
  },
  {
    id: '4',
    sys_date_created: '2020-06-29T21:17:06.670690Z',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    type: 'message',
    user_id: 'a',
  },
  {
    id: '5',
    sys_date_created: '2020-06-29T21:17:06.670690Z',
    text: 'Lorem ipsum dolor sit.',
    type: 'message',
  },
  {
    id: '6',
    sys_date_created: '2020-06-29T21:17:06.670690Z',
    text: 'Lorem ipsum dolor sit amet.',
    type: 'message',
    user_id: 'a',
  },
  {
    id: '7',
    sys_date_created: '2020-06-29T21:17:06.670690Z',
    text: 'Lorem, ipsum.',
    type: 'message',
    user_id: 'a',
  },
  {
    id: '8',
    sys_date_created: '2020-06-29T21:17:06.670690Z',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    type: 'message',
    user_id: 'a',
  },
];

const loadingTheme = {
  animations: {
    loading,
  },
  componentVariables: {
    ChatMessage: ({ colorScheme }) => ({
      backgroundColor: colorScheme.default.background3,
      backgroundColorMine: colorScheme.default.background3,
      contentColor: colorScheme.default.background3,
    }),
  },
};

export { loadingMessages, loadingTheme };
