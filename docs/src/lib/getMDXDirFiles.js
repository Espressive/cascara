// This is needed to get any MDX files in the directory associated with
// the current route. Maybe we could replace this later as a lookup on
// the tree generated from getMDXTree for efficiency... but in theory
// this is only used during development or when rendering our static
// pages and then we are done.

import dirTree from 'directory-tree';

const getMDXDirFiles = (routeParams) =>
  // TODO: Memoize OR convert to a lookup on the memoized return from getMDXTree
  dirTree(
    `../packages/cascara/src/${routeParams.mdx[0]}/${routeParams.mdx[1]}`,
    {
      extensions: /\.(mdx|fixture.js)$/,
    }
  ).children;

export default getMDXDirFiles;
