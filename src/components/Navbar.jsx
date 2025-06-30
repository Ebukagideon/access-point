import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx'; // Updated to .jsx

const Navbar = () => {
  const { cartItems } = useCart(); // Access cartItems array from context
  const [isOpen, setIsOpen] = useState(false);

  // Calculate total items by summing quantities
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        {/* Logo/Brand */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">Access-points</h1>

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

        {/* Cart Icon and Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <NavLink
            to="/cart"
            className="text-gray-200 hover:text-gray-300 transition-colors duration-300 flex items-center"
            onClick={(e) => {
              console.log('Navigating to /cart');
              if (e.defaultPrevented) console.log('Cart link event prevented');
            }}
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </NavLink>
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
              `block px-4 py-2 text-lg ${isActive ? 'text-gray-300 font-semibold' : 'text-gray-200 hover:text-gray-300'} transition-colors duration-300 flex items-center`
            }
            onClick={(e) => {
              console.log('Navigating to /');
              setIsOpen(false); // Close menu on click
              if (e.defaultPrevented) console.log('Home link event prevented');
            }}
          >
            <svg
              className="w-6 h-6 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </NavLink>
          <NavLink
            to="/store"
            className={({ isActive }) =>
              `block px-4 py-2 text-lg ${isActive ? 'text-gray-300 font-semibold' : 'text-gray-200 hover:text-gray-300'} transition-colors duration-300 flex items-center`
            }
            onClick={(e) => {
              console.log('Navigating to /store');
              setIsOpen(false); // Close menu on click
              if (e.defaultPrevented) console.log('Store link event prevented');
            }}
          >
            <svg
              className="w-6 h-6 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h18M3 7h18M3 12h18m-6 5h6M3 17h12"
              />
            </svg>
            Store
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `block px-4 py-2 text-lg ${isActive ? 'text-gray-300 font-semibold' : 'text-gray-200 hover:text-gray-300'} transition-colors duration-300 flex items-center`
            }
            onClick={(e) => {
              console.log('Navigating to /cart');
              setIsOpen(false); // Close menu on click
              if (e.defaultPrevented) console.log('Cart link event prevented');
            }}
          >
            <svg
              className="w-6 h-6 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Cart
            {totalItems > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;