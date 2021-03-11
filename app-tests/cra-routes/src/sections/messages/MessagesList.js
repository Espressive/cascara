import React from 'react';
import pt from 'prop-types';
import { List } from '../../layout';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const MessagesList = ({ children }) => (
  <List heading='MessagesList'>{children}</List>
);

MessagesList.propTypes = propTypes;

export default MessagesList;
