import pt from 'prop-types';

import '@espressive/legacy-css';

const propTypes = {
  Component: pt.element,
  // eslint-disable-next-line react/forbid-prop-types -- We do not know what the object params might be in this case
  pageProps: pt.object,
};

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

MyApp.propTypes = propTypes;

export default MyApp;
