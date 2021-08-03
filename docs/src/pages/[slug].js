import hydrate from 'next-mdx-remote/hydrate';
import Head from 'next/head';
import pt from 'prop-types';

import { postFilePaths, POSTS_PATH } from '../lib/mdxUtils';
import getMDXTree from '../lib/getMDXTree';
import MDX_COMPONENTS from '../lib/MDX_COMPONENTS';
import MDX_OPTIONS from '../lib/MDX_OPTIONS';

const propTypes = {
  frontMatter: pt.shape({
    description: pt.string,
    title: pt.string,
  }),
  source: pt.string,
};

const PostPage = ({ source, frontMatter }) => {
  const content = hydrate(source, { components: MDX_COMPONENTS });
  return (
    <div style={{ maxWidth: '60em' }}>
      <Head>
        <title>{frontMatter.title} - Cascara</title>
        {frontMatter?.description && (
          <meta
            content={frontMatter.description}
            key='description'
            name='description'
          />
        )}
      </Head>

      <h1>
        {frontMatter.title || 'PLEASE ADD A TITLE TO YOUR MDX FRONTMATTER'}
      </h1>
      {content}
    </div>
  );
};

const getStaticPaths = async () => {
  const paths = postFilePaths
    // Do not generate a path for the index file
    .filter((path) => path !== 'index.mdx')
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    fallback: false,
    paths,
  };
};

const getStaticProps = async ({ params }) => {
  const {
    version: cascaraVersion,
  } = require('../../../packages/cascara/package');
  const fs = require('fs');
  const path = require('path');
  const matter = require('gray-matter');
  const renderToString = require('next-mdx-remote/render-to-string');

  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
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
      cascaraVersion,
      frontMatter: data,
      mdxTree: getMDXTree(),
      posts,
      source: mdxSource,
    },
  };
};

PostPage.propTypes = propTypes;

export { getStaticPaths, getStaticProps };
export default PostPage;
