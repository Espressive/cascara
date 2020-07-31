export default {
  title: 'Cascara',
  dest: '/build/docs',
  // menu: ['Introduction', 'Variables', 'UI', 'Layouts'],
  port: 4000,
  themeConfig: {
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
