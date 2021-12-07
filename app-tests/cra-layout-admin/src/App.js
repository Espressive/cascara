import React from 'react';
import { AdminStructure } from '@espressive/cascara';

const App = () => {
  return (
    <AdminStructure
      header={
        <AdminStructure.Header>
          <h1>{process.env.REACT_APP_NAME}</h1>
        </AdminStructure.Header>
      }
      main={<AdminStructure.Main>{'Admin.Main'}</AdminStructure.Main>}
      nav={<AdminStructure.Nav>{'Admin.Nav'}</AdminStructure.Nav>}
    />
  );
};

export default App;
