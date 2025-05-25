// src/context/ProductContext.js
import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const productTypes = [
    { name: 'Bonnet', category: 'Body Parts', subcategory: 'Exterior', },
    { name: 'Fender', category: 'Body Parts', subcategory: 'Exterior',},
    { name: 'Bumper', category: 'Body Parts', subcategory: 'Exterior', },
    { name: 'Headlight', category: 'Lighting', subcategory: 'Front', },
    { name: 'Front Grill', category: 'Body Parts', subcategory: 'Exterior', },
    { name: 'Rear Light', category: 'Lighting', subcategory: 'Rear', },
    { name: 'Foglamp', category: 'Lighting', subcategory: 'Front', },
    { name: 'Sand Protector', category: 'Protection', subcategory: 'Exterior', },
  ];

  const brandsAndModels = [
    { brand: 'Toyota', models: [
        { name: 'Camry', years: [2008, 2010, 2012, 2014, 2016, 2018] },
        { name: 'Corolla', years: [2010, 2012, 2014, 2016, 2018, 2020] },
        { name: 'Highlander', years: [2010, 2012, 2014, 2016, 2018, 2020] },
      ]
    },
    { brand: 'Lexus', models: [
        { name: 'IS 350', years: [2014, 2016, 2018, 2020] },
      ]
    },
    { brand: 'Mercedes', models: [
        { name: 'C-Class', years: [2012, 2014, 2016, 2018, 2020] },
      ]
    },
  ];

  // Generate products: each product type available for every brand, model, and year
  let id = 1;
  const products = [];
  brandsAndModels.forEach(({ brand, models }) => {
    models.forEach(({ name: model, years }) => {
      years.forEach((year) => {
        productTypes.forEach((productType) => {
          products.push({
            id: id++,
            name: productType.name,
            category: productType.category,
            subcategory: productType.subcategory,
            brand,
            model,
            year,
            price: productType.price,
          });
        });
      });
    });
  });

  const [stateProducts, setProducts] = useState(products);
  const [originalProducts] = useState(products);

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
    <ProductContext.Provider value={{ products: stateProducts, searchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};