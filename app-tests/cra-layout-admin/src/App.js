import React from 'react';
import { Admin } from '@espressive/cascara';

const App = () => {
  return (
    <Admin
      header={
        <Admin.Header>
          <h1>{process.env.REACT_APP_NAME}</h1>
        </Admin.Header>
      }
      main={<Admin.Main>{'Admin.Main'}</Admin.Main>}
      nav={<Admin.Nav>{'Admin.Nav'}</Admin.Nav>}
    />
  );
};

export default App;
