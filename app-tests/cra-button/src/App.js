import React from 'react';
import './App.css';
import { Button } from '@espressive/cascara';

import {
  Checkbox,
  Container,
  Divider,
  Input,
  Radio,
  Button as SUIButton,
  Form as SUIF,
} from 'semantic-ui-react';

const App = () => {
  return (
    <Container className='App'>
      <header className='App-header'>
        <h1>{process.env.REACT_APP_NAME}</h1>
        <Button content='Positive Cascara Button' outcome='positive' />
        <Divider />
        <SUIF>
          <SUIF.Input label='Form Input' />
          <SUIF.Checkbox label='Form Checkbox' />
          <SUIF.Radio label='Form Radio' />
          <SUIF.Button content='Form Button' />
        </SUIF>
        <Divider />
        <Checkbox />
        <Divider />
        <Radio />
        <Divider />
        <Input />
        <Divider />
        <SUIButton content='SUI Button' />
      </header>
    </Container>
  );
};

export default App;
