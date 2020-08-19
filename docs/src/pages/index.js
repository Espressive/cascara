import Head from 'next/head';
import pkg from '../../package';
import styles from '../styles/Home.module.css';
import { getComponentMDXFiles, getMDXFileList } from '../lib/getMDXFiles';

export default function Home() {
  return (
    <>
      <Head>
        <title>{pkg.name}</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <h1 className={styles.title}>{pkg.name}</h1>

      <p>Do stuff here.</p>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      mdxPages: {
        layout: getComponentMDXFiles('../packages/cascara/src/layout'),
        specs: getMDXFileList('../packages/cascara/specs'),
        ui: getComponentMDXFiles('../packages/cascara/src/ui'),
      },
    },
    // Keep this here for updates to the MDX file
    revalidate: 1,
  };
}
