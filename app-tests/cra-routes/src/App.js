import React from 'react';

import Structure from './Structure';

import { Header, Nav } from './components';

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
        <ListRoutes />
      </Structure.List>
      <Structure.Detail>
        <DetailRoutes />
      </Structure.Detail>
    </Structure>
  );
};

export default App;
