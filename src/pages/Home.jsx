// src/pages/Home.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import bannerImage from '../assets/banner.jpeg';
// Import your before-and-after images from the assets folder
import BnF1 from '../assets/BnF1.jpeg';
import BnF2 from '../assets/BnF2.jpeg';
import BnF3 from '../assets/BnF3.jpeg';
import BnF4 from '../assets/BnF4.jpeg';
import BnF5 from '../assets/BnF5.jpeg';

const Home = () => {
  const { products } = useContext(ProductContext);

  // State for carousel
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slides array using imported images
  const slides = [
    { image: BnF1, caption: 'Exterior Enhancement' },
    { image: BnF2, caption: 'Headlight Restoration' },
    { image: BnF3, caption: 'Bumper Replacement' },
    { image: BnF4, caption: 'Interior Detailing' },
    { image: BnF5, caption: 'Interior Detailing' },
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // 5000ms = 5 seconds
    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Select one sample per unique product type
  const uniqueProductTypes = [...new Set(products.map((product) => product.name))];
  const sampleProducts = uniqueProductTypes.map((type) =>
    products.find((product) => product.name === type)
  ).filter((product) => product !== undefined); // Filter out undefined if products are not loaded

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="mb-6 ">
        <img
          src={bannerImage}
          alt="Banner"
          className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Business Details and Slideshow Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Access-points</h2>
        <p className="text-gray-600 mb-4">
          Access-points is your trusted upgrade specialist, offering the selling and servicing of quality products and services. We ensure your vehicle receives the best care and enhancements to keep it running smoothly and looking its best.
        </p>

        {/* Before and After Slideshow */}
        <div className="mt-6">
          <h3 className="text-xl font-medium text-gray-700 mb-4">Our Work: Before and After</h3>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <img
                src={slides[currentSlide].image}
                alt="Before and After"
                className="w-full h-auto max-h-64 sm:max-h-80 md:max-h-96 object-contain rounded-md transition-opacity duration-500"
              />
            </div>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">{slides[currentSlide].caption}</p>
            <div className="flex justify-center mt-4 space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-gray-700 scale-125' : 'bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Samples Section */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Featured Samples</h2>
        {sampleProducts.length === 0 ? (
          <p className="text-center text-gray-600">No products available</p>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300"
              >
                <div className="h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                  <span className="text-gray-500">Image Placeholder</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600">{product.brand}</p>
                <p className="text-gray-600">
                  {product.model} ({product.year})
                </p>
                <p className="text-gray-600">
                  {product.category} - {product.subcategory}
                </p>
                <Link
                  to="/store"
                  className="mt-4 w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition block text-center"
                >
                  Shop Now
                </Link>
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-8">
          <Link
            to="/store"
            className="inline-block bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition"
          >
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;