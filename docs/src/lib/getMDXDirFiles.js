// This is needed to get any MDX files in the directory associated with
// the current route. Maybe we could replace this later as a lookup on
// the tree generated from getMDXTree for efficiency... but in theory
// this is only used during development or when rendering our static
// pages and then we are done.

import dirTree from 'directory-tree';

// TODO: Memoize OR convert to a lookup on the memoized return from getMDXTree
const getMDXDirFiles = (routeParams) => {
  // Get a directory tree of MDX files
  const tree = dirTree(
    `../packages/cascara/src/${routeParams.mdx[0]}/${routeParams.mdx[1]}`,
    {
      extensions: /\.(mdx)$/,
    }
  ).children;

  // Remove any empty directories by looking at size
  const cleanTree = tree.filter((dir) => dir.size > 0);

  return cleanTree;
};

export default getMDXDirFiles;
