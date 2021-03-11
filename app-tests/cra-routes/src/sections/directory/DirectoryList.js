import React from 'react';
import pt from 'prop-types';
import { List } from '../../layout';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const DirectoryList = ({ children }) => (
  <List heading='DirectoryList'>{children}</List>
);

DirectoryList.propTypes = propTypes;

export default DirectoryList;
