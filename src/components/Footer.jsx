import React from 'react';
import { PhoneIcon, UserGroupIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-200 p-8 animate-gradient-x shadow-2xl">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Company Info */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white tracking-wide">Access-points</h3>
          <p className="text-gray-400 leading-relaxed max-w-xs">
            Your premier destination for quality car spare parts and services.
          </p>
        </div>

        {/* Contact Us */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-100">Contact Us</h3>
          <div className="space-y-2">
            <a
              href="https://wa.me/+2348147999973"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center md:justify-start space-x-3 text-gray-300 hover:text-green-400 transition-all duration-300 transform hover:scale-105"
            >
              <PhoneIcon className="h-6 w-6" />
              <span className="hover:underline">WhatsApp</span>
            </a>
            <a
              href="https://facebook.com/accesspoints"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center md:justify-start space-x-3 text-gray-300 hover:text-blue-400 transition-all duration-300 transform hover:scale-105"
            >
              <UserGroupIcon className="h-6 w-6" />
              <span className="hover:underline">Facebook</span>
            </a>
          </div>
        </div>

        {/* Support */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-100">Support</h3>
          <p className="text-gray-400">Email: <a href="mailto:Emmannaji81@gmail.com" className="hover:text-gray-300 hover:underline">Emmannaji81@gmail.com</a></p>
        </div>

        {/* Address */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-100">Address</h3>
          <p className="text-gray-400 flex items-center justify-center md:justify-start space-x-2">
            <MapPinIcon className="h-6 w-6" />
            <span>26 Yoruba Road S/G Kano</span>
          </p>
          <a
            href="https://maps.google.com/?q=26+Yoruba+Road+S/G+Kano"
            target="_blank"
            rel="noopener noreferrer"
            // className="text-gray-300 hover:text-gray-100 hover:underline transition"
            className="inline-block bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-semibold"className="inline-block bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-semibold"
          >
            View on Map
          </a>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mt-10 border-t border-gray-700 pt-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-lg bg-gray-800 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full md:w-1/3"
          />
          <button className="bg-gray-600 hover:bg-gray-500 text-white p-3 rounded-lg transition-all duration-300 transform hover:scale-105 w-full md:w-auto">
            Subscribe
          </button>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>© 2025 Access-points. All rights reserved.</p>
      </div>
    </footer>
  );
};

// Animation for gradient background
const styles = `
  @keyframes gradientX {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animate-gradient-x {
    background-size: 200% 200%;
    animation: gradientX 15s ease infinite;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default Footer;