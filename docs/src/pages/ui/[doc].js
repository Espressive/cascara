/* eslint-disable react/no-multi-comp */

import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getComponentMDXFiles, getMDXFileList } from '../../lib/getMDXFiles';

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const Doc = () => {
  const router = useRouter();
  const { doc } = router.query;

  const capitalizedComponent = capitalize(doc);

  const MDXComponent = dynamic(
    () => {
      return import(
        `../../../../packages/cascara/src/ui/${capitalizedComponent}/${capitalizedComponent}.spec.mdx`
      );
    },
    { loading: () => <p>...</p> }
  );

  return <MDXComponent />;
};

export async function getStaticPaths() {
  return {
    fallback: true,
    paths: [{ params: { doc: 'button' } }, { params: { doc: 'pagination' } }],
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
        doc: params.doc,
      },
    },
    // Keep this here for updates to the MDX file
    revalidate: 1,
  };
}

export default Doc;
