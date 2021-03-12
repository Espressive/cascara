import React from 'react';
import pt from 'prop-types';
import { useParams } from 'react-router-dom';
import { BaristaStructure } from '@espressive/cascara';
import { TestLink } from '../../components';
import { basePath as directory } from '../directory';
import { basePath as shop } from '.';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const ShopDetail = ({ children }) => {
  const { id } = useParams();

  return (
    <BaristaStructure.Detail header={`${shop.label} ${id}`}>
      <TestLink to={`//${directory.path}/3`}>{directory.label} 3</TestLink>
      {children}
    </BaristaStructure.Detail>
  );
};

ShopDetail.propTypes = propTypes;

export default ShopDetail;
