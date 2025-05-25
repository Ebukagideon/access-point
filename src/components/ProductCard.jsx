// src/components/ProductCard.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useContext(CartContext);

  // Check if the product is already in the cart
  const isInCart = cartItems.some((item) => item.id === product.id);

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300">
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-gray-600">{product.brand}</p>
      <p className="text-gray-600">{product.model} ({product.year})</p>
      <p className="text-gray-600">{product.category} - {product.subcategory}</p>
      <div className="mt-4 flex space-x-2">
        <Link
          to={`/products/${product.id}`}
          className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition text-center"
        >
          View Details
        </Link>
        <button
          onClick={() => addToCart(product)}
          className={`flex-1 px-4 py-2 rounded-md transition text-white ${
            isInCart
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-gray-600 hover:bg-gray-800 hover:scale-105'
          }`}
        >
          {isInCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;