export default {
  title: 'Cascara',
  dest: '/build/docs',
  public: '/docz/public',
  menu: ['Readme', 'Todo'],
  port: 4000,
  themeConfig: {
    initialColorMode: 'dark',
    showDarkModeSwitch: false,
    showMarkdownEditButton: false,
    colors: {
      modes: {
        dark: {
          playground: {
            bg: '#f9f9f9',
          },
        },
      },
    },
  },
};
