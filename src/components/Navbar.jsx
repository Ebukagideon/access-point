// src/components/Navbar.jsx
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
            onClick={(e) => {
              console.log('Navigating to /');
              if (e.defaultPrevented) console.log('Home link event prevented');
            }}
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
            onClick={(e) => {
              console.log('Navigating to /store');
              if (e.defaultPrevented) console.log('Store link event prevented');
            }}
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
            onClick={(e) => {
              console.log('Navigating to /cart');
              if (e.defaultPrevented) console.log('Cart link event prevented');
            }}
          >
            Cart
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;