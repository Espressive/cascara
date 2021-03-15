import React from 'react';
import { BaristaStructure } from '@espressive/cascara';
import { TestLink } from '../../components';
import { basePath as shop } from '.';

const ShopList = () => (
  <BaristaStructure.List header={`${shop.label} List`}>
    <TestLink to='1'>{shop.label} 1</TestLink>
    <TestLink to='2'>{shop.label} 2</TestLink>
    <TestLink to='3'>{shop.label} 3</TestLink>
    <TestLink to='4'>{shop.label} 4</TestLink>
    <TestLink to='5'>{shop.label} 5</TestLink>
    <TestLink to='6'>{shop.label} 6</TestLink>
  </BaristaStructure.List>
);

export default ShopList;
