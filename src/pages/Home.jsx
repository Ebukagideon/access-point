import React, { useContext, useState } from 'react';
import Search from '../components/Search';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import { ProductContext } from '../context/ProductContext';

const Home = () => {
  const { products, searchProducts } = useContext(ProductContext);
  const [category, setCategory] = useState(null);
  const [subcategory, setSubcategory] = useState(null);
  const [brand, setBrand] = useState(null);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = !category || product.category === category;
    const matchesSubcategory = !subcategory || product.subcategory === subcategory;
    const matchesBrand = !brand || product.brand === brand;
    return matchesCategory && matchesSubcategory && matchesBrand;
  });

  return (
    <div className="p-6">
      <Search onSearch={searchProducts} />
      <div className="flex flex-col md:flex-row mt-4">
        <Sidebar
          selectedCategory={category}
          setSelectedCategory={setCategory}
          setSelectedSubcategory={setSubcategory}
          selectedBrand={brand}
          setSelectedBrand={setBrand}
        />
        <div className="flex-1 md:ml-4">
          <h2 className="text-2xl font-semibold text-center mb-6">Access-points</h2>
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-600">No products found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;