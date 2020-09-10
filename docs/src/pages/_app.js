import '@espressive/legacy-css';
import '../styles/_app.scss';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Admin } from '@espressive/cascara';
import { Header, Main, Nav, PropTable } from '../components';

// NOTE: Anything in the <Head> here is esentially a fallback. These tags can
// be overridden at the page level. <meta> type tags will need a key added
// to them in order for them to be updated, otherwise React will not know
// that the tag is changing. Below the viewport tag does not have a key added
// because that should never be changed. But the description does have a key
// since we will possibly want to change that on a per-page basis.

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const propTable = pageProps?.mdxDirSource?.[router?.query?.doc]?.docData;

  return (
    <>
      <Head>
        <title>Cascara</title>
        <meta
          content="Espressive's Functional Design System"
          key='description'
          name='description'
        />
        <meta
          content='https://cascara.design/cascara_meta.png'
          key='image'
          property='og:image'
        />
        <meta content='width=device-width, initial-scale=1.0' name='viewport' />
      </Head>
      <Admin
        drawer={
          propTable && (
            <Admin.Drawer>
              <PropTable docData={propTable} />
            </Admin.Drawer>
          )
        }
        header={<Header {...pageProps} />}
        main={
          <Main>
            <Component {...pageProps} />
          </Main>
        }
        nav={<Nav {...pageProps} />}
      />
    </>
  );
}

export default MyApp;
