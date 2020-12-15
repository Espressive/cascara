import React from 'react';

import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

import Nav from '../Nav';
import Routes from '../Routes';

const propTypes = {};
const queryCache = new QueryCache();

const App = () => {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Nav />
      <Routes />
      <ReactQueryDevtools initialIsOpen />
    </ReactQueryCacheProvider>
  );
};

App.propTypes = propTypes;

export default App;
