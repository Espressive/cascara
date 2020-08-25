import '@espressive/legacy-css';
import { Admin } from '@espressive/cascara';
import { Header, Nav } from '../components';

function MyApp({ Component, pageProps }) {
  return (
    <Admin>
      <Header {...pageProps} />
      <Nav {...pageProps} />
      <Admin.Main>
        <Component {...pageProps} />
      </Admin.Main>
    </Admin>
  );
}

export default MyApp;
