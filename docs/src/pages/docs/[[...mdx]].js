/* eslint-disable react/no-multi-comp*/
// @refresh reset
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import dirTree from 'directory-tree';

// NOTE: This needs to become global
const MDX_COMPONENTS = {
  strong: (props) => <strong className='custom-strong' {...props} />,
};

const Doc = ({ data, mdxFiles, mdxSource }) => {
  return (
    <>
      {/* <pre>
        <code>
          {JSON.stringify(mdxFiles, null, '  ')}
          {JSON.stringify(data, null, '  ')}
          {JSON.stringify(mdxSource, null, '  ')}
        </code>
      </pre> */}
      {mdxSource && hydrate(mdxSource, { components: MDX_COMPONENTS })}
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    fallback: true,
    paths: [{ params: { mdx: ['ui', 'Pagination'] } }],
  };
};

export const getStaticProps = async ({ params }) => {
  const mdxFiles = dirTree(
    `../packages/cascara/src/${params.mdx[0]}/${params.mdx[1]}`,
    {
      extensions: /\.(mdx|fixture.js)$/,
    }
  ).children;

  const mdxTree = dirTree('../packages/cascara/src', {
    extensions: /\.(mdx|fixture.js)$/,
  }).children;

  // NOTE: This is pretty risky as-is. We will eventually want to parse any of the files from
  // the mdxTree and store them in an object based on their type OR have a fallback
  const filePath = mdxFiles.length > 1 ? mdxFiles[1].path : mdxFiles[0].path;
  const fullPath = path.join(process.cwd(), filePath);
  const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'));

  const mdxSource = await renderToString(content, {
    components: MDX_COMPONENTS,
    scope: data,
  });

  return {
    props: {
      data,
      mdxFiles,
      mdxSource,
      mdxTree,
      params: {
        mdx: [],
      },
    },
    // Keep this here for updates to the MDX file
    revalidate: 1,
  };
};

export default Doc;
