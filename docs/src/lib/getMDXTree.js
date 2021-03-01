/*
 * This is needed on both the index.js and any other /page that
 * is going to display overall doc navigation. This is because
 * Nextjs does not yet support using getStaticProps at the
 * _app.js level yet.
 * https://github.com/vercel/next.js/discussions/10949#discussioncomment-1203
 */

import dirTree from 'directory-tree';
const fs = require('fs');
// const path = require('path');
const matter = require('gray-matter');

const isEmpty = (dir) => dir.size > 0;

/*
 * Defining this as a function so we can memoize here. This will also
 * keep this consistent with the sibling function for getting directory
 * files which does need to be a function in order to use route params.
 */

// TODO: Memoize this
const getMDXTree = () => {
  // Get MDX files in our applicaiton
  const tree = dirTree('../packages/cascara/src', {
    extensions: /\.(mdx)$/,
  }).children;
  // Remove any empty directories by looking at size
  const cleanTree = tree.filter(isEmpty);

  const treeWithMeta = cleanTree.map((section) => {
    const sectionData = section.children.filter(isEmpty).map((comp) => {
      const compDataPath = comp.children[0].path;
      const source = fs.readFileSync(compDataPath);
      const { data } = matter(source);
      return {
        ...comp,
        meta: data,
      };
    });

    return {
      ...section,
      children: sectionData,
    };
  });

  return treeWithMeta;
};

export default getMDXTree;
