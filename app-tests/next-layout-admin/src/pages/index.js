import '@espressive/legacy-css';
import Head from 'next/head';
import pkg from '../../package';

import { Admin } from '@espressive/cascara';

const Home = () => {
  return (
    <Admin
      header={
        <Admin.Header>
          <h1>{pkg.name}</h1>
        </Admin.Header>
      }
      main={<Admin.Main>{'Admin.Main'}</Admin.Main>}
      nav={<Admin.Nav>{'Admin.Nav'}</Admin.Nav>}
    >
      <Head>
        <title>{pkg.name}</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>
    </Admin>
  );
};

export default Home;
