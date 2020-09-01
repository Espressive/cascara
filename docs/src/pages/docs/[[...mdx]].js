import hydrate from 'next-mdx-remote/hydrate';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MDX_COMPONENTS from '../../lib/MDX_COMPONENTS';
import MDX_OPTIONS from '../../lib/MDX_OPTIONS';
import getMDXTree from '../../lib/getMDXTree';
import getMDXDirFiles from '../../lib/getMDXDirFiles';

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

  const mdxActive = hydrate(mdxDirSource[router?.query?.doc || 0], {
    components: MDX_COMPONENTS,
  });

  // TODO: Update the top level navigation to a tab UI once we have the components to support it
  return (
    <>
      <Head>
        <title>{router?.query?.mdx[1]} - Cascara</title>
      </Head>

      <ul style={{ listStyle: 'none' }}>
        {mdxDirSource.map((doc, i) => (
          <li
            key={i}
            style={
              Number(router?.query?.doc) === i
                ? { listStyle: 'disc' }
                : undefined
            }
          >
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
              <a>
                {doc.fileName} {Number(router?.query?.doc) === i}
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <AnimatePresence exitBeforeEnter>
        <motion.div
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          // Technically works. But really this should be at the router.query.doc
          // level and the overall page should have its own transition.
          key={JSON.stringify(router)}
          style={{ padding: '1em' }}
        >
          {mdxActive}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export const getStaticPaths = async () => {
  const tree = getMDXTree();

  let staticPaths = [];

  tree.forEach((element) => {
    const { name, children } = element;
    children.forEach((child) => {
      // We only want a static path for directories that have files in them.
      // Technically the file size returned is based on the files being filtered
      // in getMDXTree() which are only MDX files at this time.
      if (child.type === 'directory' && child.size > 0) {
        staticPaths.push({ params: { mdx: [name, child.name] } });
      }
    });
  });

  return {
    fallback: false,
    paths: staticPaths,
  };
};

export const getStaticProps = async ({ params }) => {
  // Any deps needed for getStaticProps should be declared as requirements
  // here instead of at the top of a file
  const matter = require('gray-matter');
  const reactDocgen = require('react-docgen');
  const path = require('path');
  const fs = require('fs');
  const renderToString = require('next-mdx-remote/render-to-string');

  const mdxDir = getMDXDirFiles(params);

  // We need to make sure this is only actual files and not a directory
  // so we are filtering it to make sure the size of the file is not zero.
  const mdxDirFiles = mdxDir.filter((file) => file.size > 0 && file);

  // This needs to be async or it will blow up since `next-mdx-remote` is
  // asyncrhonously getting all MDX files and rendering them to string.
  // Without the Promise.all pattern this will blow up on us.

  const mdxDirSource = await Promise.all(
    mdxDirFiles.map(async (file) => {
      const filePath = path.join(process.cwd(), file.path);
      const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));

      const fileSource = await renderToString(content, {
        components: MDX_COMPONENTS,
        mdxOptions: MDX_OPTIONS,
      });

      let docData = null;

      if (data.propTable) {
        const componentPath = path.join(
          process.cwd(),
          path.dirname(file.path),
          data.propTable
        );

        const componentRead = fs.readFileSync(componentPath, 'utf8');
        docData = reactDocgen.parse(componentRead);
      }

      return {
        docData,
        fileName: file.name,
        frontmatter: data,
        ...fileSource,
      };
    })
  );

  return {
    props: {
      mdxDirFiles,
      mdxDirSource,
      mdxTree: getMDXTree(),
      params: {
        mdx: [],
      },
    },
    // Keep this here for updates to the MDX file
    revalidate: 1,
  };
};

export default Doc;
