import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <nav>
    <Link to='/'>Home</Link>
    <Link to='users'>Users</Link>
    <Link to='posts'>Posts</Link>
  </nav>
);

export default Nav;
