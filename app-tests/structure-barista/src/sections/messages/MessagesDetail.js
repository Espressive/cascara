import React from 'react';
import pt from 'prop-types';
import { useParams } from 'react-router-dom';
import { BaristaStructure } from '@espressive/cascara';
import { TestLink } from '../../components';
import { basePath as shop } from '../shop';
import { basePath as messages } from './';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const MessagesDetail = ({ children }) => {
  const { id } = useParams();

  return (
    <BaristaStructure.Detail header={`${messages.label} ${id}`}>
      <TestLink to={`//${shop.path}/3`}>{shop.label} 3</TestLink>
      {children}
    </BaristaStructure.Detail>
  );
};

MessagesDetail.propTypes = propTypes;

export default MessagesDetail;
