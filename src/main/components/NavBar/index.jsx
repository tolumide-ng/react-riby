import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <div className="w-full shadow-md flex flex-row justify-between py-2 fixed bg-white">
    <p className="pl-4">React-Riby</p>
    <div data-testid="navbar" className="pr-4">
      <NavLink to="/" className="mr-4 focus:bg-gray-300 px-3 py-2">
        Home
      </NavLink>
      <NavLink to="/search" className="focus:bg-gray-300 px-3 py-2">
        Search
      </NavLink>
    </div>
  </div>
);

export default NavBar;
