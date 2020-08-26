import getMDXTree from '../lib/getMDXTree';

// NOTE: Still need to figure out what shows here and how we
// manage it. For now all of the fallback <Head> tags in _app
// render for this page.

export default function Home({ mdxTree }) {
  return (
    <details style={{ padding: '1em' }}>
      <summary>mdxTree</summary>
      <pre>
        <code>{JSON.stringify(mdxTree, null, '  ')}</code>
      </pre>
    </details>
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
