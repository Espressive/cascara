import React, { Suspense } from 'react';

import { BaristaStructure } from '@espressive/cascara';

import AppNav from './components/AppNav';

import { DetailRoutes, ListRoutes } from './routes';

const App = () => {
  return (
    <BaristaStructure
      detail={
        <Suspense fallback={<BaristaStructure.Detail isLoading />}>
          <DetailRoutes />
        </Suspense>
      }
      header={<BaristaStructure.Header title='Cool Company' />}
      list={
        <Suspense fallback={<BaristaStructure.List isLoading />}>
          <ListRoutes />
        </Suspense>
      }
      nav={<AppNav />}
    />
  );
};

export default App;
