import '@espressive/legacy-css';
import Head from 'next/head';
import pkg from '../../package';
import styles from '../styles/Home.module.css';

import { Button } from '@espressive/cascara';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>{pkg.name}</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{pkg.name}</h1>

        <Button content='Test' />
      </main>
    </div>
  );
}
