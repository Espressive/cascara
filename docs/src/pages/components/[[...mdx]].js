/* eslint-disable react/no-multi-comp */

import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getComponentMDXFiles, getMDXFileList } from '../../lib/getMDXFiles';

// const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const Doc = () => {
  const router = useRouter();
  const { mdx } = router.query;

  // console.warn(mdx);

  // const capitalizedComponent = capitalize(doc);

  const MDXComponent = dynamic(
    () => {
      return import(
        `../../../../packages/cascara/src/${mdx[0]}/${mdx[1]}/${mdx[1]}.spec.mdx`
      );
    },
    { loading: () => <p>...</p> }
  );

  return <MDXComponent />;
};

export async function getStaticPaths() {
  return {
    fallback: true,
    paths: [{ params: { mdx: [] } }],
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      mdxPages: {
        layout: getComponentMDXFiles('../packages/cascara/src/layout'),
        specs: getMDXFileList('../packages/cascara/specs'),
        ui: getComponentMDXFiles('../packages/cascara/src/ui'),
      },
      params: {
        mdx: [],
      },
    },
    // Keep this here for updates to the MDX file
    revalidate: 1,
  };
}

export default Doc;
