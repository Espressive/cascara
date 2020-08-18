import Head from 'next/head';
import pkg from '../../package';

import { Admin } from '@espressive/cascara';

export default function Home() {
  return (
    <Admin>
      <Head>
        <title>{pkg.name}</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <Admin.Header>
        <h1>{pkg.name}</h1>
      </Admin.Header>

      <Admin.Nav>{'Admin.Nav'}</Admin.Nav>

      <Admin.Main>{'Admin.Main'}</Admin.Main>
    </Admin>
  );
}
