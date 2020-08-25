import Head from 'next/head';
import getMDXTree from '../lib/getMDXTree';

export default function Home({ mdxTree }) {
  return (
    <>
      <Head>
        <title>Cascara</title>
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
      mdxTree: getMDXTree(),
    },
    // Keep this here for updates to the MDX files
    revalidate: 1,
  };
}
