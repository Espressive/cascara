import '@espressive/legacy-css';
import Head from 'next/head';
import pkg from '../../package';

import { AdminStructure } from '@espressive/cascara';

const Home = () => {
  return (
    <AdminStructure
      header={
        <AdminStructure.Header>
          <h1>{pkg.name}</h1>
        </AdminStructure.Header>
      }
      main={<AdminStructure.Main>{'AdminStructure.Main'}</AdminStructure.Main>}
      nav={<AdminStructure.Nav>{'AdminStructure.Nav'}</AdminStructure.Nav>}
    >
      <Head>
        <title>{pkg.name}</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>
    </AdminStructure>
  );
};

export default Home;
