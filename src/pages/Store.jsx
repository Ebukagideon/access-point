// src/pages/Store.jsx
import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const Store = () => {
  const { products } = useContext(ProductContext);

  // Group products by brand and model
  const groupedByBrand = products.reduce((acc, product) => {
    const { brand, model } = product;
    if (!acc[brand]) {
      acc[brand] = {};
    }
    if (!acc[brand][model]) {
      acc[brand][model] = [];
    }
    acc[brand][model].push(product);
    return acc;
  }, {});

  // Convert grouped data to an array for rendering
  const brands = Object.keys(groupedByBrand).map((brandName) => ({
    brand: brandName,
    models: Object.keys(groupedByBrand[brandName]).map((modelName) => ({
      name: modelName,
      spareParts: groupedByBrand[brandName][modelName],
    })),
  }));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Store</h2>
      {brands.length === 0 ? (
        <p className="text-center text-gray-600">No products available</p>
      ) : (
        <div className="space-y-8">
          {brands.map((brandData) => (
            <div key={brandData.brand} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{brandData.brand}</h3>
              <div className="space-y-6">
                {brandData.models.map((model) => (
                  <div key={model.name}>
                    <h4 className="text-xl font-medium text-gray-700 mb-2">{model.name}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {model.spareParts.map((part) => (
                        <ProductCard key={part.id} product={part} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Store;