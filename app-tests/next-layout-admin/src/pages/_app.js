import React from 'react';
import pt from 'prop-types';

import '@espressive/legacy-css';

const propTypes = {
  Component: pt.element,
  pageProps: pt.shape({}),
};

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

MyApp.propTypes = propTypes;

export default MyApp;
