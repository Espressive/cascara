const withMdxEnhanced = require('next-mdx-enhanced');

module.exports = withMdxEnhanced({
  layoutPath: 'src/layouts',
  defaultLayout: true,
  fileExtensions: ['mdx'],
  remarkPlugins: [
    require('remark-emoji'),
    require('remark-slug'),
    require('remark-code-titles'),
  ],
})({
  devIndicators: {
    autoPrerender: false,
  },
  reactStrictMode: true,
});
