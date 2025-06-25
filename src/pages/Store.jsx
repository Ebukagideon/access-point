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
    <div className="bg-gray-50 min-h-screen relative">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-8 text-center animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 tracking-wide">Access-points Store</h1>
          <p className="text-gray-600 mt-2 text-lg sm:text-xl max-w-2xl mx-auto">
            Explore our wide range of high-quality spare parts for Toyota, Lexus, Mercedes, and more. Find the perfect parts for your vehicle!
          </p>
        </header>

        {/* Selection Section */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-200 mb-8">
          <div className="space-y-6">
            {/* Product Type Selection */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Select Product Type:</label>
              <select
                value={selectedProductType}
                onChange={(e) => {
                  setSelectedProductType(e.target.value);
                  setSelectedBrand('');
                  setSelectedModel('');
                }}
                className="w-full p-3 border rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-gray-400 transition"
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
                <label className="block text-gray-700 font-semibold mb-2">Select Brand:</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => {
                    setSelectedBrand(e.target.value);
                    setSelectedModel('');
                  }}
                  className="w-full p-3 border rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-gray-400 transition"
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
                <label className="block text-gray-700 font-semibold mb-2">Select Model:</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full p-3 border rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-gray-400 transition"
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
              <div className="mt-6">
                <button
                  onClick={clearSelections}
                  className="w-full sm:w-auto bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Clear Selections
                </button>
              </div>
            )}
          </div>

          {/* Display Products with Years */}
          {filteredProducts.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-medium text-gray-700 mb-6">Available {selectedProductType}s for {selectedBrand} {selectedModel}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
          {filteredProducts.length === 0 && selectedProductType && selectedBrand && selectedModel && (
            <p className="text-center text-gray-600 mt-6">No products found for the selected criteria.</p>
          )}
        </div>
      </div>

      {/* Enquiry Button */}
      <div className="fixed bottom-6 right-6">
        <a
          href="https://wa.me/1234567890?text=I%20would%20like%20to%20make%20an%20enquiry%20about%20a%20car%20upgrade"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 flex items-center space-x-2"
        >
          Enquiry
        </a>
      </div>
    </div>
  );
};

export default Store;