import React from 'react';
import { BaristaStructure } from '@espressive/cascara';
import { TestLink } from '../../components';
import { basePath as messages } from './';

const MessagesList = () => (
  <BaristaStructure.List header={`${messages.label} List`}>
    <TestLink to='1'>{messages.label} 1</TestLink>
    <TestLink to='2'>{messages.label} 2</TestLink>
    <TestLink to='3'>{messages.label} 3</TestLink>
    <TestLink to='4'>{messages.label} 4</TestLink>
    <TestLink to='5'>{messages.label} 5</TestLink>
    <TestLink to='6'>{messages.label} 6</TestLink>
  </BaristaStructure.List>
);

export default MessagesList;
