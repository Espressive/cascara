import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <aside>
    <nav>
      <Link to='/'>Home</Link>
      <Link to='applications'>Applications</Link>
    </nav>
  </aside>
);

export default Nav;
