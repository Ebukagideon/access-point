import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        {/* Logo/Brand */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">Access-points</h1>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden sm:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg ${isActive ? 'text-gray-300 font-semibold' : 'text-gray-200 hover:text-gray-300'} transition-colors duration-300`
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
              `text-lg ${isActive ? 'text-gray-300 font-semibold' : 'text-gray-200 hover:text-gray-300'} transition-colors duration-300`
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
              `text-lg ${isActive ? 'text-gray-300 font-semibold' : 'text-gray-200 hover:text-gray-300'} transition-colors duration-300`
            }
            onClick={(e) => {
              console.log('Navigating to /cart');
              if (e.defaultPrevented) console.log('Cart link event prevented');
            }}
          >
            Cart
          </NavLink>
        </div>

        {/* Mobile Menu */}
        <div
          className={`sm:hidden absolute top-full right-4 mt-2 w-48 bg-gray-800 rounded-md shadow-lg ${
            isOpen ? 'block' : 'hidden'
          } transition-all duration-300 ease-in-out`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-4 py-2 text-lg ${isActive ? 'text-gray-300 font-semibold' : 'text-gray-200 hover:text-gray-300'} transition-colors duration-300`
            }
            onClick={(e) => {
              console.log('Navigating to /');
              setIsOpen(false); // Close menu on click
              if (e.defaultPrevented) console.log('Home link event prevented');
            }}
          >
            Home
          </NavLink>
          <NavLink
            to="/store"
            className={({ isActive }) =>
              `block px-4 py-2 text-lg ${isActive ? 'text-gray-300 font-semibold' : 'text-gray-200 hover:text-gray-300'} transition-colors duration-300`
            }
            onClick={(e) => {
              console.log('Navigating to /store');
              setIsOpen(false); // Close menu on click
              if (e.defaultPrevented) console.log('Store link event prevented');
            }}
          >
            Store
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `block px-4 py-2 text-lg ${isActive ? 'text-gray-300 font-semibold' : 'text-gray-200 hover:text-gray-300'} transition-colors duration-300`
            }
            onClick={(e) => {
              console.log('Navigating to /cart');
              setIsOpen(false); // Close menu on click
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