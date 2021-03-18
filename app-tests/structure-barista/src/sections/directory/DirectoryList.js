import React from 'react';
import pt from 'prop-types';
import { BaristaStructure } from '@espressive/cascara';
import { TestLink } from '../../components';
import { basePath as directory } from './';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const DirectoryList = ({ children }) => (
  <BaristaStructure.List header={`${directory.label} List`}>
    <TestLink to='1'>{directory.label} 1</TestLink>
    <TestLink to='2'>{directory.label} 2</TestLink>
    <TestLink to='3'>{directory.label} 3</TestLink>
    <TestLink to='4'>{directory.label} 4</TestLink>
    <TestLink to='5'>{directory.label} 5</TestLink>
    <TestLink to='6'>{directory.label} 6</TestLink>
  </BaristaStructure.List>
);

DirectoryList.propTypes = propTypes;

export default DirectoryList;
