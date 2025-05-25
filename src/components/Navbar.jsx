import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Access-points</h1>
        <div className="space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-gray-300 font-semibold'
                : 'text-gray-200 hover:text-gray-300 transition'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/store"
            className={({ isActive }) =>
              isActive
                ? 'text-gray-300 font-semibold'
                : 'text-gray-200 hover:text-gray-300 transition'
            }
          >
            Store
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? 'text-gray-300 font-semibold'
                : 'text-gray-200 hover:text-gray-300 transition'
            }
          >
            Cart
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;