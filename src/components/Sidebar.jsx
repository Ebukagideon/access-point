// src/components/Sidebar.jsx
import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

const Sidebar = ({
  selectedCategory,
  setSelectedCategory,
  setSelectedSubcategory,
  selectedBrand,
  setSelectedBrand,
}) => {
  const { products } = useContext(ProductContext);

  // Derive unique brands from products
  const uniqueBrands = [...new Set(products.map((product) => product.brand))];

  // Derive models for the selected brand
  const modelsForSelectedBrand = selectedCategory
    ? [...new Set(products.filter((product) => product.brand === selectedCategory).map((product) => product.model))]
    : [];

  return (
    <div className="w-full md:w-64 bg-gray-700 text-white p-6 rounded-lg shadow-md mb-4 md:mb-0">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">Categories</h2>
      <ul>
        {uniqueBrands.map((brand) => (
          <li key={brand} className="mb-2">
            <button
              onClick={() => {
                setSelectedCategory(brand);
                setSelectedSubcategory(null);
              }}
              className={`w-full text-left p-2 rounded-md ${
                selectedCategory === brand
                  ? 'bg-gray-600 text-gray-100'
                  : 'text-gray-200 hover:bg-gray-600 hover:text-gray-100 transition'
              }`}
            >
              {brand}
            </button>
            {selectedCategory === brand && (
              <ul className="ml-4 mt-2">
                {modelsForSelectedBrand.map((model) => (
                  <li key={model}>
                    <button
                      onClick={() => setSelectedSubcategory(model)}
                      className={`w-full text-left p-2 rounded-md text-gray-300 hover:bg-gray-600 hover:text-gray-100 transition`}
                    >
                      {model}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-100">Brands</h2>
      <ul>
        {uniqueBrands.map((brand) => (
          <li key={brand}>
            <button
              onClick={() => setSelectedBrand(brand)}
              className={`w-full text-left p-2 rounded-md ${
                selectedBrand === brand
                  ? 'bg-gray-600 text-gray-100'
                  : 'text-gray-200 hover:bg-gray-600 hover:text-gray-100 transition'
              }`}
            >
              {brand}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => setSelectedBrand(null)}
            className="w-full text-left p-2 rounded-md text-gray-300 hover:bg-gray-600 hover:text-gray-100 transition"
          >
            All Brands
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;