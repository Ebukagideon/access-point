// src/pages/Home.jsx
import React, { useContext, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
// Import banner images from assets
import banner1 from '../assets/banner1.jpeg';
import banner2 from '../assets/banner2.jpeg';
import banner3 from '../assets/banner3.jpeg';
// Import your before-and-after images from the assets folder
import BnF1 from '../assets/BnF1.jpeg';
import BnF2 from '../assets/BnF2.jpeg';
import BnF3 from '../assets/BnF3.jpeg';
import BnF4 from '../assets/BnF4.jpeg';
import BnF5 from '../assets/BnF5.jpeg';
// Import existing images for all features
import bonnet1 from '../assets/bonnet1.jpeg';
import bonnet2 from '../assets/bonnet2.jpeg';
import bonnet3 from '../assets/bonnet3.jpeg';
import bumper1 from '../assets/bumper1.jpeg';
import bumper2 from '../assets/bumper2.jpeg';
import bumper3 from '../assets/bumper3.jpeg';
import fender1 from '../assets/fender1.jpeg';
import fender2 from '../assets/fender2.jpeg';
import fender3 from '../assets/fender3.jpeg';
import headlight1 from '../assets/headlight1.jpeg';
import headlight2 from '../assets/headlight2.jpeg';
import headlight3 from '../assets/headlight3.jpeg';
import frontgrill1 from '../assets/frontgrill1.jpeg';
import frontgrill2 from '../assets/frontgrill2.jpeg';
import frontgrill3 from '../assets/frontgrill3.jpeg';
import rearlight1 from '../assets/rearlight1.jpeg';
import rearlight2 from '../assets/rearlight2.jpeg';
import rearlight3 from '../assets/rearlight3.jpeg';
import foglamp1 from '../assets/foglamp1.jpeg';
import foglamp2 from '../assets/foglamp2.jpeg';
import foglamp3 from '../assets/foglamp3.jpeg';
import sandprotect1 from '../assets/sandprotect1.jpeg';
import sandprotect2 from '../assets/sandprotect2.jpeg';
import sandprotect3 from '../assets/sandprotect3.jpeg';

const Home = () => {
  const { products } = useContext(ProductContext) || { products: [] }; // Fallback to empty array

  // State for carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState({});

  // Slides array for Before and After Slideshow
  const slides = [
    { image: BnF1, caption: 'Exterior Enhancement' },
    { image: BnF2, caption: 'Headlight Restoration' },
    { image: BnF3, caption: 'Bumper Replacement' },
    { image: BnF4, caption: 'Interior Detailing' },
    { image: BnF5, caption: 'Interior Detailing' },
  ];

  // Memoize sampleProducts to prevent unnecessary recalculations
  const sampleProducts = useMemo(() => {
    const uniqueProductTypes = products && products.length > 0 ? [...new Set(products.map((product) => product.name.toLowerCase()))] : [];
    return uniqueProductTypes.map((type) =>
      products.find((product) => product.name.toLowerCase() === type)
    ).filter((product) => product !== undefined);
  }, [products]);

  // Initialize slideIndices for each sample product
  const [slideIndices, setSlideIndices] = useState(() =>
    sampleProducts.reduce((acc, _, index) => ({ ...acc, [index]: 0 }), {})
  );

  // Update slideIndices when sampleProducts changes to avoid index mismatches
  useEffect(() => {
    setSlideIndices(
      sampleProducts.reduce((acc, _, index) => ({ ...acc, [index]: 0 }), {})
    );
  }, [sampleProducts]);

  // Auto-advance banner slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3); // Cycle through 3 slides
    }, 5000); // 5000ms = 5 seconds
    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  useEffect(() => {
    setLoading(false); // Set loading to false after initial render
  }, []);

  // Load images only when sampleProducts changes
  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates on unmount

    const loadImages = async () => {
      const urls = {};
      for (const product of sampleProducts) {
        const name = product.name.toLowerCase().replace(' ', '');
        urls[product.id] = imageMap[name] || ['https://via.placeholder.com/300x300', 'https://via.placeholder.com/300x300', 'https://via.placeholder.com/300x300'];
      }
      if (isMounted) {
        setImageUrls(urls); // Only update state if component is mounted
      }
    };

    if (sampleProducts.length > 0) {
      loadImages();
    } else {
      setImageUrls({}); // Reset imageUrls if no products
    }

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, [sampleProducts]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToSlideForSample = (sampleIndex, direction) => {
    setSlideIndices((prev) => {
      const currentIndex = prev[sampleIndex] || 0;
      let newIndex;
      if (direction === 'next') {
        newIndex = currentIndex === 2 ? 0 : currentIndex + 1; // Cycle to first image if at the last one
      } else {
        newIndex = currentIndex === 0 ? 2 : currentIndex - 1; // Cycle to last image if at the first one
      }
      return { ...prev, [sampleIndex]: newIndex };
    });
  };

  // Define image mappings following the pattern
  const imageMap = {
    bonnet: [bonnet1, bonnet2, bonnet3],
    bumper: [bumper1, bumper2, bumper3],
    fender: [fender1, fender2, fender3],
    headlight: [headlight1, headlight2, headlight3],
    frontgrill: [frontgrill1, frontgrill2, frontgrill3],
    rearlight: [rearlight1, rearlight2, rearlight3],
    foglamp: [foglamp1, foglamp2, foglamp3],
    sandprotector: [sandprotect1, sandprotect2, sandprotect3],
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      {/* 3-Slide Banner */}
      <div className="mb-6 relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-md">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {sampleProducts.slice(0, 3).map((product, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img
                src={index === 0 ? banner1 : index === 1 ? banner2 : banner3}
                alt={`${product.name} banner`}
                className="w-full h-48 sm:h-64 md:h-80 object-cover"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/800x300'; }}
              />
              {/* <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 p-2 rounded">
                <h2 className="text-xl sm:text-2xl font-bold">{product.name}</h2>
                <p className="text-sm sm:text-base">{product.category} - {product.subcategory}</p>
                <Link
                  to={`/product/${product.id}`}
                  className="mt-2 inline-block bg-gray-600 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-md hover:bg-gray-700 transition text-sm"
                >
                  View Product
                </Link>
              </div> */}
            </div>
          ))}
        </div>
        {/* Navigation Dots */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-gray-700' : 'bg-gray-400'} hover:bg-gray-500 transition`}
            ></button>
          ))}
        </div>
        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + 3) % 3)}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
        >
          &lt;
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
        >
          &gt;
        </button>
      </div>

      {/* Business Details and Slideshow Section */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">About Access-points</h2>
        <p className="text-gray-600 mb-4 text-sm sm:text-base">
          Access-points is your trusted upgrade specialist, offering the selling and servicing of quality products and services. We ensure your vehicle receives the best care and enhancements to keep it running smoothly and looking its best.
        </p>

        {/* Before and After Slideshow */}
        <div className="mt-6">
          <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-4">Our Work: Before and After</h3>
          <div className="relative max-w-4xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="flex justify-center">
              <img
                src={slides[currentSlide].image}
                alt="Before and After"
                className="w-full h-auto max-h-48 sm:max-h-64 md:max-h-80 lg:max-h-96 object-contain rounded-md transition-opacity duration-500"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600'; }}
              />
            </div>
            <p className="text-gray-600 mt-2 text-xs sm:text-sm md:text-base">{slides[currentSlide].caption}</p>
            <div className="flex justify-center mt-4 space-x-1 sm:space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
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
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6 sm:mb-8">Featured Samples</h2>
        {sampleProducts.length === 0 ? (
          <p className="text-center text-gray-600 text-sm sm:text-base">No products available</p>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {sampleProducts.map((product, index) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105"
              >
                <div className="relative h-40 sm:h-48 flex items-center justify-center">
                  {/* Left Arrow */}
                  <button
                    onClick={() => goToSlideForSample(index, 'prev')}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-700 transition-opacity duration-300 opacity-75 hover:opacity-100"
                    aria-label={`Previous image for ${product.name}`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  {/* 3-image slider for each sample */}
                  <img
                    src={imageUrls[product.id] ? imageUrls[product.id][0] : 'https://via.placeholder.com/300x300'}
                    alt={`${product.name} Image 1`}
                    className="max-w-full max-h-full object-contain rounded-md transition-opacity duration-500"
                    style={{ display: slideIndices[index] === 0 ? 'block' : 'none' }}
                  />
                  <img
                    src={imageUrls[product.id] ? imageUrls[product.id][1] : 'https://via.placeholder.com/300x300'}
                    alt={`${product.name} Image 2`}
                    className="max-w-full max-h-full object-contain rounded-md transition-opacity duration-500"
                    style={{ display: slideIndices[index] === 1 ? 'block' : 'none' }}
                  />
                  <img
                    src={imageUrls[product.id] ? imageUrls[product.id][2] : 'https://via.placeholder.com/300x300'}
                    alt={`${product.name} Image 3`}
                    className="max-w-full max-h-full object-contain rounded-md transition-opacity duration-500"
                    style={{ display: slideIndices[index] === 2 ? 'block' : 'none' }}
                  />

                  {/* Right Arrow */}
                  <button
                    onClick={() => goToSlideForSample(index, 'next')}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-700 transition-opacity duration-300 opacity-75 hover:opacity-100"
                    aria-label={`Next image for ${product.name}`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {product.category} - {product.subcategory}
                </p>
                <Link
                  to="/store"
                  className="mt-4 w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition block text-center text-sm sm:text-base"
                  onClick={(e) => {
                    console.log('Navigating to /store');
                    window.scrollTo(0, 0); // Scroll to top on navigation
                    if (e.defaultPrevented) console.log('Event prevented');
                  }}
                >
                  Shop Now
                </Link>
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-6 sm:mt-8">
          <Link
            to="/store"
            className="inline-block bg-gray-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md hover:bg-gray-700 transition text-sm sm:text-base"
            onClick={(e) => {
              console.log('Navigating to /store');
              window.scrollTo(0, 0); // Scroll to top on navigation
              if (e.defaultPrevented) console.log('Event prevented');
            }}
          >
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;