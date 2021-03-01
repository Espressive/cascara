/*
 * This should allow us to unify our configuration of MDX plugins
 * since we are currently need this configuration in multiple locations.
 */

import visit from 'unist-util-visit';
import emoji from 'remark-emoji';
import slug from 'remark-slug';
import headings from 'remark-autolink-headings';
import codeFrontmatter from 'remark-code-frontmatter';

/*
 * This transformer will spread all frontmatter and pass each as a prop
 * into any code type block. This only works for code blocks due to our
 * remark-code-frontmatter plugin. We use the MDAST properties to add
 * these. Good examples of this info and how the transition to HAST works
 * are here: https://github.com/syntax-tree/mdast-util-to-hast#examples
 */
const transformer = (tree) => {
  visit(tree, 'code', (node) => {
    if (Object.keys(node.frontmatter).length) {
      node.data = {
        hProperties: {
          ...node.frontmatter,
        },
      };
    }
  });
  return tree;
};

const MDX_OPTIONS = {
  remarkPlugins: [
    emoji,
    slug,
    // headings has to come after slug for it to work correctly
    headings,
    codeFrontmatter,
    () => transformer,
  ],
};

export default MDX_OPTIONS;
