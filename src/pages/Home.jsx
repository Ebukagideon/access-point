// src/pages/Home.jsx
import React, { useContext, useState } from 'react';
import Search from '../components/Search';
import Sidebar from '../components/Sidebar';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';
import bannerImage from '../assets/banner.jpeg';

const Home = () => {
  const { products, searchProducts } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const [category, setCategory] = useState(null);
  const [subcategory, setSubcategory] = useState(null);
  const [brand, setBrand] = useState(null);

  // State for carousel
  const [currentSlide, setCurrentSlide] = useState(0);

  // Placeholder slides for "before and after" images (replace with actual URLs)
  const slides = [
    {
      before: 'https://via.placeholder.com/300x200?text=Before+Car+Upgrade+1',
      after: 'https://via.placeholder.com/300x200?text=After+Car+Upgrade+1',
      caption: 'Car Upgrade - Exterior Enhancement',
    },
    {
      before: 'https://via.placeholder.com/300x200?text=Before+Car+Upgrade+2',
      after: 'https://via.placeholder.com/300x200?text=After+Car+Upgrade+2',
      caption: 'Car Upgrade - Headlight Restoration',
    },
    {
      before: 'https://via.placeholder.com/300x200?text=Before+Car+Upgrade+3',
      after: 'https://via.placeholder.com/300x200?text=After+Car+Upgrade+3',
      caption: 'Car Upgrade - Bumper Replacement',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

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

  // Convert grouped data to an array for rendering, applying filters
  const filteredBrands = Object.keys(groupedByBrand)
    .filter((brandName) => !category || brandName === category)
    .map((brandName) => ({
      brand: brandName,
      models: Object.keys(groupedByBrand[brandName])
        .filter((modelName) => !subcategory || modelName === subcategory)
        .map((modelName) => ({
          name: modelName,
          spareParts: groupedByBrand[brandName][modelName],
        })),
    }))
    .filter((brandData) => brandData.models.length > 0);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Banner Section */}
      <div className="mb-6 relative">
        <img
          src={bannerImage}
          alt="Banner"
          className="w-full h-64 md:h-96 object- rounded-lg shadow-md"
        />
      </div>

      {/* Business Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Access-points</h2>
        <p className="text-gray-600 mb-4">
          Access-points is your trusted upgrade specialist, offering the selling and servicing of quality products and services. We ensure your vehicle receives the best care and enhancements to keep it running smoothly and looking its best.
        </p>

        {/* Before and After Slideshow */}
        <div className="mt-6">
          <h3 className="text-xl font-medium text-gray-700 mb-4">Our Work: Before and After</h3>
          <div className="relative max-w-3xl mx-auto">
            <div className="flex justify-center items-center space-x-4">
              <img
                src={slides[currentSlide].before}
                alt="Before"
                className="w-1/2 h-48 object-cover rounded-md"
              />
              <img
                src={slides[currentSlide].after}
                alt="After"
                className="w-1/2 h-48 object-cover rounded-md"
              />
            </div>
            <p className="text-gray-600 mt-2">{slides[currentSlide].caption}</p>
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={prevSlide}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
              >
                Previous
              </button>
              <button
                onClick={nextSlide}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <Search onSearch={searchProducts} />
      <div className="flex flex-col md:flex-row mt-6 gap-6">
        <Sidebar
          selectedCategory={category}
          setSelectedCategory={setCategory}
          setSelectedSubcategory={setSubcategory}
          selectedBrand={brand}
          setSelectedBrand={setBrand}
        />
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Access-points</h2>
          {filteredBrands.length === 0 ? (
            <p className="text-center text-gray-600">No products found</p>
          ) : (
            <div className="space-y-8">
              {filteredBrands.map((brandData) => (
                <div key={brandData.brand} className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">{brandData.brand}</h3>
                  <div className="space-y-6">
                    {brandData.models.map((model) => (
                      <div key={model.name}>
                        <h4 className="text-xl font-medium text-gray-700 mb-2">{model.name}</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {model.spareParts.map((part) => (
                            <li
                              key={part.id}
                              className="p-3 bg-gray-50 rounded-md shadow-sm flex justify-between items-center"
                            >
                              <div>
                                <span className="text-gray-600">{part.name}</span>
                                <span className="block text-sm text-gray-500">${part.price.toFixed(2)}</span>
                              </div>
                              <button
                                onClick={() => addToCart(part)}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                              >
                                Add to Cart
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;