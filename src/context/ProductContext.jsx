// src/context/ProductContext.js
import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Ceramic Brake Pads',
      category: 'Brakes',
      subcategory: 'Brake Pads',
      brand: 'Toyota',
      price: 49.99,
      image: 'https://via.placeholder.com/150',
    },
    // Add more products
  ]);

  const searchProducts = (query) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <ProductContext.Provider value={{ products, searchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};