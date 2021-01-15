import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

import { EspAuthProvider } from '../libraries/espAuth';
import Nav from '../components/Nav';
import Routes from '../components/Routes';

const propTypes = {};
const queryCache = new QueryCache();

const App = () => {
  return (
    <EspAuthProvider config={{ baseURL: 'https://release.qa.espressive.com' }}>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <BrowserRouter>
          <Nav />
          <Routes />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen />
      </ReactQueryCacheProvider>
    </EspAuthProvider>
  );
};

App.propTypes = propTypes;

export default App;
