import React, { Suspense } from 'react';

import Structure from './Structure';

import { Header, Nav } from './components';

import { Detail, List } from './layout';

import { DetailRoutes, ListRoutes } from './routes';

const App = () => {
  return (
    <Structure>
      <Structure.Header>
        <Header />
      </Structure.Header>
      <Structure.Nav>
        <Nav />
      </Structure.Nav>
      <Structure.List>
        <Suspense fallback={<List isLoading />}>
          <ListRoutes />
        </Suspense>
      </Structure.List>
      <Structure.Detail>
        <Suspense fallback={<Detail isLoading />}>
          <DetailRoutes />
        </Suspense>
      </Structure.Detail>
    </Structure>
  );
};

export default App;
