import React from 'react';
import pt from 'prop-types';
import { MemoryRouter } from 'react-router-dom';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

// Adding a memory decorator because we have a fixture test
// to make sure we can render nav link component
const StructuresDecorator = ({ children }) => (
  <MemoryRouter>{children}</MemoryRouter>
);

StructuresDecorator.propTypes = propTypes;

export default StructuresDecorator;
