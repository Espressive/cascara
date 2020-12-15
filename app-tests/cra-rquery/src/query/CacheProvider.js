import React from 'react';
import { ReactQueryCacheProvider, QueryCache } from 'react-query';

const queryCache = new QueryCache();

const CacheProvider = ({ children, ...rest }) => (
  <ReactQueryCacheProvider queryCache={queryCache} {...rest}>
    {children}
  </ReactQueryCacheProvider>
);

export default CacheProvider;
