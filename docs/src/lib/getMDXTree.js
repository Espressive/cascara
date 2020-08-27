// This is needed on both the index.js and any other /page that
// is going to display overall doc navigation. This is because
// Nextjs does not yet support using getStaticProps at the
// _app.js level yet.
// https://github.com/vercel/next.js/discussions/10949#discussioncomment-1203

import dirTree from 'directory-tree';

// Defining this as a function so we can memoize here. This will also
// keep this consistent with the sibling function for getting directory
// files which does need to be a function in order to use route params.
const getMDXTree = () =>
  // TODO: Memoize this
  dirTree('../packages/cascara/src', {
    extensions: /\.(mdx)$/,
  }).children;

export default getMDXTree;
