/* eslint-disable react/no-multi-comp*/

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import dirTree from 'directory-tree';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import MDX_COMPONENTS from '../../lib/MDX_COMPONENTS';

const Doc = ({ mdxDirSource }) => {
  // const [activeDoc, setActiveDoc] = useState(0);
  const router = useRouter();

  // Set the query parameter to 0 if none is set and make
  // sure we are doing this as a replace() in history
  useEffect(() => {
    if (router?.query?.doc === undefined) {
      router.replace(
        {
          pathname: router.pathname,
          query: { doc: 0 },
        },
        {
          pathname: router.asPath.split('?')[0],
          query: { doc: 0 },
        },
        { shallow: true }
      );
    }
  }, [router]);

  return (
    <>
      <ul>
        {mdxDirSource.map((doc, i) => (
          <li key={i}>
            <Link
              as={{
                pathname: router.asPath.split('?')[0],
                query: { doc: i },
              }}
              href={{
                pathname: router.pathname,
                query: { doc: i },
              }}
            >
              <a>{doc.fileName}</a>
            </Link>
          </li>
        ))}
      </ul>
      {mdxDirSource &&
        hydrate(mdxDirSource[router?.query?.doc || 0], {
          components: MDX_COMPONENTS,
        })}
    </>
  );
};

export const getStaticPaths = async () => {
  // TODO: Need to auto generate this array for static generation
  // leaving fallback to `false` means reloading on a page missing
  // from the array will show a 404
  return {
    fallback: false,
    paths: [
      { params: { mdx: ['layout', 'Admin'] } },
      { params: { mdx: ['specs', 'Allie'] } },
      { params: { mdx: ['specs', 'Table'] } },
      { params: { mdx: ['ui', 'Button'] } },
      { params: { mdx: ['ui', 'Filter'] } },
      { params: { mdx: ['ui', 'Pagination'] } },
    ],
  };
};

export const getStaticProps = async ({ params }) => {
  // This gives us all of the MDX files relative to the directory we are
  // currently showing. This could potentially be a lookup on the initial
  // mdxTree data, but for now since this is only run when the pages are
  // statically generated, we can probably just leave this here and
  // call dirTree function again.
  const mdxDirFiles = dirTree(
    `../packages/cascara/src/${params.mdx[0]}/${params.mdx[1]}`,
    {
      extensions: /\.(mdx|fixture.js)$/,
    }
  ).children;

  // mdxTree should probably be abstracted out to lib so we can also use it
  // in index,js. Eventaully when Nextjs allows getStaticProps at the root
  // of an application `_app.js` we can move this to one place and not have it
  // on every page. Technically this is needed to populate the navigation.
  const mdxTree = dirTree('../packages/cascara/src', {
    extensions: /\.(mdx|fixture.js)$/,
  }).children;

  const mdxDirSource = await Promise.all(
    mdxDirFiles.map(async (file) => {
      const filePath = path.join(process.cwd(), file.path);
      const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));

      const fileSource = await renderToString(content, {
        components: MDX_COMPONENTS,
        scope: data,
      });

      return {
        fileName: file.name,
        ...fileSource,
      };
    })
  );

  return {
    props: {
      mdxDirFiles,
      mdxDirSource,
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
