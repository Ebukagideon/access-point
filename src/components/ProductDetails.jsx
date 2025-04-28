import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="p-6 text-center text-gray-600">Product not found</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 max-w-4xl mx-auto">
      <img
        src={product.image}
        alt={product.name}
        className="w-full md:w-1/2 h-64 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
        <p className="text-2xl text-blue-500 mb-4">${product.price.toFixed(2)}</p>
        <p className="text-gray-700 mb-6">{product.description}</p>
        <button
          onClick={() => addToCart(product)}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;