// src/pages/Store.jsx
import React, { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const Store = () => {
  const { products } = useContext(ProductContext);
  const [selectedProductType, setSelectedProductType] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  // Get unique product types and brands
  const uniqueProductTypes = [...new Set(products.map((product) => product.name))];
  const uniqueBrands = [...new Set(products.map((product) => product.brand))];

  // Get unique models for the selected brand
  const uniqueModels = selectedBrand
    ? [...new Set(
        products
          .filter((product) => product.brand === selectedBrand)
          .map((product) => product.model)
      )]
    : [];

  // Get products for the selected criteria
  const filteredProducts = selectedProductType && selectedBrand && selectedModel
    ? products.filter(
        (product) =>
          product.name === selectedProductType &&
          product.brand === selectedBrand &&
          product.model === selectedModel
      )
    : [];

  const clearSelections = () => {
    setSelectedProductType('');
    setSelectedBrand('');
    setSelectedModel('');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Access-points Store</h1>
        <p className="text-gray-600 mt-2">
          Explore our wide range of high-quality spare parts for Toyota, Lexus, Mercedes, and more. Find the perfect parts for your vehicle!
        </p>
      </header>

      {/* Selection Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="space-y-4">
          {/* Product Type Selection */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Select Product Type:</label>
            <select
              value={selectedProductType}
              onChange={(e) => {
                setSelectedProductType(e.target.value);
                setSelectedBrand('');
                setSelectedModel('');
              }}
              className="w-full p-2 border rounded-md"
            >
              <option value="">-- Select Product Type --</option>
              {uniqueProductTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Brand Selection */}
          {selectedProductType && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">Select Brand:</label>
              <select
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setSelectedModel('');
                }}
                className="w-full p-2 border rounded-md"
              >
                <option value="">-- Select Brand --</option>
                {uniqueBrands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
          )}

          {/* Model Selection */}
          {selectedBrand && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">Select Model:</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">-- Select Model --</option>
                {uniqueModels.map((model) => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
          )}

          {/* Clear Selections Button */}
          {(selectedProductType || selectedBrand || selectedModel) && (
            <div className="mt-4">
              <button
                onClick={clearSelections}
                className="w-full md:w-auto bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
              >
                Clear Selections
              </button>
            </div>
          )}
        </div>

        {/* Display Products with Years */}
        {filteredProducts.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Available {selectedProductType}s for {selectedBrand} {selectedModel}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Store;