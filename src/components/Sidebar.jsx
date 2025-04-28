import React from 'react';
import { categories, brands } from '../data.js';

const Sidebar = ({
  selectedCategory,
  setSelectedCategory,
  setSelectedSubcategory,
  selectedBrand,
  setSelectedBrand,
}) => {
  return (
    <div className="w-full md:w-64 bg-gray-700 text-white p-6 rounded-lg shadow-md mb-4 md:mb-0">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">Categories</h2>
      <ul>
        {Object.keys(categories).map((category) => (
          <li key={category} className="mb-2">
            <button
              onClick={() => {
                setSelectedCategory(category);
                setSelectedSubcategory(null);
              }}
              className={`w-full text-left p-2 rounded-md ${
                selectedCategory === category
                  ? 'bg-gray-600 text-gray-100'
                  : 'text-gray-200 hover:bg-gray-600 hover:text-gray-100 transition'
              }`}
            >
              {category}
            </button>
            {selectedCategory === category && (
              <ul className="ml-4 mt-2">
                {categories[category].map((sub) => (
                  <li key={sub}>
                    <button
                      onClick={() => setSelectedSubcategory(sub)}
                      className={`w-full text-left p-2 rounded-md text-gray-300 hover:bg-gray-600 hover:text-gray-100 transition`}
                    >
                      {sub}
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
        {brands.map((brand) => (
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