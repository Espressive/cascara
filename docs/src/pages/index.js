import hydrate from 'next-mdx-remote/hydrate';
import getMDXTree from '../lib/getMDXTree';
import { postFilePaths, POSTS_PATH } from '../lib/mdxUtils';
import MDX_COMPONENTS from '../lib/MDX_COMPONENTS';
import MDX_OPTIONS from '../lib/MDX_OPTIONS';

export default function Home({ source, frontMatter }) {
  const content = hydrate(source, { components: MDX_COMPONENTS });
  return content;
}

export async function getStaticProps() {
  console.log(process.env.GIT_BRANCH);

  const fs = require('fs');
  const path = require('path');
  const matter = require('gray-matter');
  const renderToString = require('next-mdx-remote/render-to-string');

  const postFilePath = path.join(POSTS_PATH, '../', 'CHANGELOG.md');
  const source = fs.readFileSync(postFilePath);

  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  const { content, data } = matter(source);

  const mdxSource = await renderToString(content, {
    components: MDX_COMPONENTS,
    mdxOptions: MDX_OPTIONS,
    scope: data,
  });

  return {
    props: {
      branch: process.env?.GIT_BRANCH,
      cascaraVersion: process.env?.npm_package_version,
      frontMatter: data,
      mdxTree: getMDXTree(),
      posts,
      source: mdxSource,
    },
    // Keep this here for updates to the MDX files
    revalidate: 1,
  };
}
