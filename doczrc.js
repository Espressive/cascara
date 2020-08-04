export default {
  dest: '/build/docs',
  menu: ['Readme', 'Todo'],
  port: 4000,
  public: '/docz/public',
  themeConfig: {
    colors: {
      modes: {
        dark: {
          playground: {
            bg: '#f9f9f9',
          },
        },
      },
    },
    initialColorMode: 'dark',
    showDarkModeSwitch: false,
    showMarkdownEditButton: false,
  },
  title: 'Cascara',
};
