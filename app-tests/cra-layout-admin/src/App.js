import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  console.warn(process.env);
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>{process.env.REACT_APP_NAME}</h1>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
    </div>
  );
}

export default App;
