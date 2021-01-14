import '@espressive/legacy-css';
import './styles.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { EspAuthProvider } from './libraries/espAuth';

import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <EspAuthProvider baseURL={'https://release.qa.espressive.com'}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </EspAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
