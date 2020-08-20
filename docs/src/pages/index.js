import Head from 'next/head';
import pkg from '../../package'; // import { getComponentMDXFiles, getMDXFileList } from '../lib/getMDXFiles';
import dirTree from 'directory-tree';

export default function Home({ mdxTree }) {
  return (
    <>
      <Head>
        <title>{pkg.name}</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <pre>
        <code>{JSON.stringify(mdxTree, null, '  ')}</code>
      </pre>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      mdxTree: dirTree('../packages/cascara/src', {
        extensions: /\.(mdx|fixture.js)$/,
      }).children,
    },
    // Keep this here for updates to the MDX files
    revalidate: 1,
  };
}
