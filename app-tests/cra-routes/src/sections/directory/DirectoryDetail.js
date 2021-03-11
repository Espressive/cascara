import React from 'react';
import pt from 'prop-types';
import { Detail } from '../../layout';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const DirectoryDetail = ({ children }) => (
  <Detail heading='DirectoryDetail'>{children}</Detail>
);

DirectoryDetail.propTypes = propTypes;

export default DirectoryDetail;
