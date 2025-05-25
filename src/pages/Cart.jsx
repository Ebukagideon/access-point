// src/pages/Cart.jsx
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Your Cart</h1>
        <p className="text-gray-600 mt-2">
          Review your selected spare parts. Prices are negotiable—contact us to discuss!
        </p>
      </header>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">Your cart is empty.</p>
          <Link
            to="/store"
            className="mt-4 inline-block bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between p-4 border-b"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">{item.brand}</p>
                  <p className="text-gray-600">{item.model} ({item.year})</p>
                  <p className="text-gray-600">{item.category} - {item.subcategory}</p>
                </div>
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400 transition"
                    >
                      -
                    </button>
                    <span className="text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400 transition"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <Link
              to="/products"
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Continue Shopping
            </Link>
            <button
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
              onClick={() => alert('Proceed to negotiate prices with our team!')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;