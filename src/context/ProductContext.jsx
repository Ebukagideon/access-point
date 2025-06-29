// src/context/ProductContext.js
import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const productTypes = [
    { name: 'Bonnet', category: 'Body Parts', subcategory: 'Exterior', },
    { name: 'Fender', category: 'Body Parts', subcategory: 'Exterior',},
    { name: 'Bumper', category: 'Body Parts', subcategory: 'Exterior', },
    { name: 'Headlight', category: 'Lighting', subcategory: 'Front light', },
    { name: 'Front Grill', category: 'Body Parts', subcategory: 'Exterior', },
    { name: 'Rear Light', category: 'Lighting', subcategory: 'Rear light', },
    { name: 'Foglamp', category: 'Lighting', subcategory: 'Front light', },
    { name: 'Sand Protector', category: 'Protector', subcategory: 'Exterior', },
    { name: 'Side Mirror', category: 'Body Parts', subcategory: 'Exterior', },
    { name: 'Door Handle', category: 'Body Parts', subcategory: 'Exterior', },
    { name: 'Engine Protector', category: 'protector', subcategory: 'Exterior', },
    { name: 'Upgrade Kit', category: 'Body Parts', subcategory: 'Exterior', },
  ];

  const brandsAndModels = [
    { brand: 'Toyota', models: [
        { name: 'Camry', years: [2010, 2012, 2014, 2018, 2020, 2024] },
        { name: 'Corolla', years: [2010, 2012, 2014, 2018, 2020, 2024] },
        { name: 'Highlander', years: [2010, 2012, 2014, 2018, 2020, 2024] },
        { name: 'Hilux', years: [2010, 2012, 2014, 2018, 2020, 2024] },
        { name: 'Venza', years: [2010, 2012, 2014, 2018, 2020, 2024] },
        { name: 'Yaris', years: [2010, 2012, 2014, 2018, 2020, 2024] },
        { name: 'Rav4', years: [2010, 2012, 2014, 2018, 2020, 2024] },
        { name: 'Avensis', years: [2010, 2012, 2014, 2018, 2020, 2024] },
        { name: 'Sienna', years: [2010, 2012, 2014, 2018, 2020, 2024] },
        { name: 'Avalon', years: [2010, 2012, 2014, 2018, 2020, 2024] },
        { name: '4 Runner', years: [2010, 2012, 2014, 2018, 2020, 2024] },
        { name: 'Matrix', years: [2010, 2012, 2014, 2018, 2020, 2024] },
        { name: 'Tacoma', years: [2010, 2012, 2014, 2018, 2020, 2024] },
        { name: 'Furtuner', years: [2010, 2012, 2014, 2018, 2020, 2024] },
        { name: 'Land Cruiser', years: [2010, 2012, 2014, 2018, 2020, 2024] },
        { name: 'Prado', years: [2010, 2012, 2014, 2018, 2020, 2024] },
      ]
    },
    { brand: 'Lexus', models: [
        { name: 'ES 350', years: [2010, 2012, 2014, 2016, 2018, 2020, 2024] },
        { name: 'IS 250', years: [2010, 2012, 2014, 2016, 2018, 2020, 2024] },
        { name: 'IS 350', years: [2010, 2012, 2014, 2016, 2018, 2020, 2024] },
        { name: 'Rx 350', years: [2010, 2012, 2014, 2016, 2018, 2020, 2024] },
        { name: 'Gx 400', years: [2010, 2012, 2014, 2016, 2018, 2020, 2024] },
        { name: 'Ex 460', years: [2010, 2012, 2014, 2016, 2018, 2020, 2024] },
        { name: 'LS 570', years: [2010, 2012, 2014, 2016, 2018, 2020, 2024] },
        { name: 'LS 600', years: [2010, 2012, 2014, 2016, 2018, 2020, 2024] },
      ]
    },
    { brand: 'Mercedes', models: [
        { name: 'C-Class', years: [2012, 2014, 2016, 2018, 2020] },
        { name: 'E-Class', years: [2012, 2014, 2016, 2018, 2020] },
        { name: 'C-Class', years: [2012, 2014, 2016, 2018, 2020] },
        { name: 'A-Class', years: [2012, 2014, 2016, 2018, 2020] },
        { name: 'ML', years: [2012, 2014, 2016, 2018, 2020] },
        { name: 'GLE', years: [2012, 2014, 2016, 2018, 2020] },
        { name: 'GL', years: [2012, 2014, 2016, 2018, 2020] },
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