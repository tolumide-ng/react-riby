import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <div className="w-full bg-blue-400 flex flex-row justify-between py-2 text-white">
    <p className="pl-4">React-Riby </p>
    <div className="pr-4">
      <NavLink to="/" className="mr-4">
        Home
      </NavLink>
      <NavLink to="/search">Search</NavLink>
    </div>
  </div>
);

export default NavBar;
