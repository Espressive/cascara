import React from 'react';

import { BaristaStructure } from '@espressive/cascara';

import AppNav from './components/AppNav';

import { DetailRoutes, ListRoutes } from './routes';

const App = () => {
  return (
    <BaristaStructure
      detail={<DetailRoutes />}
      header={<BaristaStructure.Header title='Cool Company' />}
      list={<ListRoutes />}
      nav={<AppNav />}
    />
  );
};

export default App;
