import React from 'react';
import { AdminStructure } from '@espressive/cascara';

import AppNav from './components/AppNav';

import { MainRoutes } from './routes';

const App = () => {
  return (
    <AdminStructure
      header={<AdminStructure.Header title='Cool Company' />}
      nav={<AppNav />}
    >
      <MainRoutes />
    </AdminStructure>
  );
};

export default App;
