import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-gray-600">{product.brand}</p>
      <p className="text-gray-600">{product.category} - {product.subcategory}</p>
      <p className="text-gray-900 font-bold mt-2">${product.price.toFixed(2)}</p>
      <div className="mt-4 flex space-x-2">
        <Link
          to={`/products/${product.id}`}
          className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition text-center"
        >
          View Details
        </Link>
        <button
          onClick={() => addToCart(product)}
          className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;