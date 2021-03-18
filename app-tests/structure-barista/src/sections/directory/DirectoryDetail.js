import React from 'react';
import pt from 'prop-types';
import { useParams } from 'react-router-dom';
import { BaristaStructure } from '@espressive/cascara';
import { TestLink } from '../../components';
import { basePath as messages } from '../messages';
import { basePath as directory } from './';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const DirectoryDetail = ({ children }) => {
  const { id } = useParams();
  return (
    <BaristaStructure.Detail header={`${directory.label} ${id}`}>
      <TestLink to={`//${messages.path}/6`}>{messages.label} 6</TestLink>
      {children}
    </BaristaStructure.Detail>
  );
};

DirectoryDetail.propTypes = propTypes;

export default DirectoryDetail;
