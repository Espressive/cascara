import React from 'react';

import Head from 'next/head';
import pkg from '../../package';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{pkg.name}</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{pkg.name}</h1>

        <p>Do stuff here.</p>
      </main>
    </div>
  );
};

export default Home;
