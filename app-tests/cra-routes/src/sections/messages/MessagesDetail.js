import React from 'react';
import pt from 'prop-types';
import { Detail } from '../../layout';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const MessagesDetail = ({ children }) => (
  <Detail heading='MessagesDetail'>{children}</Detail>
);

MessagesDetail.propTypes = propTypes;

export default MessagesDetail;
