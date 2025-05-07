// src/context/ProductContext.js
import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    // Toyota products
    { id: 1, name: 'Bonnet', category: 'Body Parts', subcategory: 'Exterior', brand: 'Toyota', model: 'Camry', price: 120.00, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Fender', category: 'Body Parts', subcategory: 'Exterior', brand: 'Toyota', model: 'Camry', price: 80.00, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Bumper', category: 'Body Parts', subcategory: 'Exterior', brand: 'Toyota', model: 'Camry', price: 100.00, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Headlight', category: 'Lighting', subcategory: 'Front', brand: 'Toyota', model: 'Corolla', price: 90.00, image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Front Grill', category: 'Body Parts', subcategory: 'Exterior', brand: 'Toyota', model: 'Corolla', price: 70.00, image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Rear Light', category: 'Lighting', subcategory: 'Rear', brand: 'Toyota', model: 'Highlander', price: 85.00, image: 'https://via.placeholder.com/150' },
    { id: 7, name: 'Foglamp', category: 'Lighting', subcategory: 'Front', brand: 'Toyota', model: 'Highlander', price: 60.00, image: 'https://via.placeholder.com/150' },
    { id: 8, name: 'Sand Protector', category: 'Protection', subcategory: 'Exterior', brand: 'Toyota', model: 'Highlander', price: 50.00, image: 'https://via.placeholder.com/150' },
    // Lexus products
    { id: 9, name: 'Bonnet', category: 'Body Parts', subcategory: 'Exterior', brand: 'Lexus', model: 'IS 350', price: 150.00, image: 'https://via.placeholder.com/150' },
    { id: 10, name: 'Fender', category: 'Body Parts', subcategory: 'Exterior', brand: 'Lexus', model: 'IS 350', price: 110.00, image: 'https://via.placeholder.com/150' },
    { id: 11, name: 'Headlight', category: 'Lighting', subcategory: 'Front', brand: 'Lexus', model: 'IS 350', price: 130.00, image: 'https://via.placeholder.com/150' },
    // Mercedes products
    { id: 12, name: 'Bumper', category: 'Body Parts', subcategory: 'Exterior', brand: 'Mercedes', model: 'C-Class', price: 140.00, image: 'https://via.placeholder.com/150' },
    { id: 13, name: 'Front Grill', category: 'Body Parts', subcategory: 'Exterior', brand: 'Mercedes', model: 'C-Class', price: 120.00, image: 'https://via.placeholder.com/150' },
    { id: 14, name: 'Foglamp', category: 'Lighting', subcategory: 'Front', brand: 'Mercedes', model: 'C-Class', price: 90.00, image: 'https://via.placeholder.com/150' },
  ]);

  const [originalProducts] = useState(products); // Store original products to reset after search

  const searchProducts = (query) => {
    if (!query) {
      setProducts(originalProducts); // Reset to original products if query is empty
      return;
    }
    setProducts(
      originalProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase()) ||
          product.model.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <ProductContext.Provider value={{ products, searchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};