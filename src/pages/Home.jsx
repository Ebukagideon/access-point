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
    return <div className="p-6 text-center text-gray-600 animate-pulse">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 3-Slide Banner */}
      <div className="relative w-full overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900 shadow-2xl">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {sampleProducts.slice(0, 3).map((product, index) => (
            <div key={index} className="w-full flex-shrink-0 relative group">
              <img
                src={index === 0 ? banner1 : index === 1 ? banner2 : banner3}
                alt={`${product.name} banner`}
                className="w-full h-64 sm:h-80 md:h-96 object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-gray-400'} hover:bg-gray-300 transition-all duration-300`}
            ></button>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + 3) % 3)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition-all duration-300"
        >
          &lt;
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition-all duration-300"
        >
          &gt;
        </button>
      </div>

      {/* Business Details and Slideshow Section */}
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-200 animate-fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center">About Access-points</h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 text-center max-w-2xl mx-auto">
            Access-points is your trusted upgrade specialist, offering the selling and servicing of quality products and services. We ensure your vehicle receives the best care and enhancements to keep it running smoothly and looking its best.
          </p>

          {/* Before and After Slideshow */}
          <div className="mt-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 text-center">Our Work: Before and After</h3>
            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden rounded-lg shadow-md">
                <img
                  src={slides[currentSlide].image}
                  alt="Before and After"
                  className="w-full h-64 sm:h-80 object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600'; }}
                />
              </div>
              <p className="text-gray-600 mt-2 text-sm sm:text-base text-center">{slides[currentSlide].caption}</p>
              <div className="flex justify-center mt-4 space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-gray-800' : 'bg-gray-400'} hover:bg-gray-600 transition-all duration-300`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Samples Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8 animate-fade-in">Featured Samples</h2>
          {sampleProducts.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">No products available</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative h-48 sm:h-56 flex items-center justify-center overflow-hidden rounded-lg">
                    <button
                      onClick={() => goToSlideForSample(index, 'prev')}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-opacity duration-300 opacity-75 hover:opacity-100"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <img
                      src={imageUrls[product.id] ? imageUrls[product.id][slideIndices[index]] : 'https://via.placeholder.com/300x300'}
                      alt={`${product.name} Image ${slideIndices[index] + 1}`}
                      className="max-w-full max-h-full object-contain rounded-md transition-opacity duration-300"
                    />
                    <button
                      onClick={() => goToSlideForSample(index, 'next')}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-opacity duration-300 opacity-75 hover:opacity-100"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mt-4">{product.name}</h3>
                  <p className="text-gray-600 text-base">{product.category} - {product.subcategory}</p>
                  <Link
                    to="/store"
                    className="mt-4 inline-block bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-full hover:shadow-md transition-all duration-300"
                  >
                    Shop Now
                  </Link>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link
              to="/store"
              className="inline-block bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 animate-fade-in">Ready to Upgrade Your Vehicle?</h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Explore our wide range of parts and services to keep your car in top shape.
          </p>
          <Link
            to="/store"
            className="inline-block bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-semibold"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

// Animation styles
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }
  .animate-fade-in {
    animation: fadeIn 1s ease-out forwards;
  }
  .animate-fade-up {
    animation: fadeUp 1s ease-out forwards;
  }
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default Home;