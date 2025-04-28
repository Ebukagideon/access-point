import React from 'react';
import { PhoneIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-700 to-gray-900 text-gray-200 p-6 border-t border-gray-600 shadow-inner">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-2">Access-points</h3>
          <p className="text-gray-300">Your one-stop shop for quality products.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-2">Contact Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="https://wa.me/+2348147999973"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-gray-100 transition"
            >
              <PhoneIcon className="h-5 w-5" />
              <span>WhatsApp</span>
            </a>
            <a
              href="https://facebook.com/accesspoints"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-gray-100 transition"
            >
              <UserGroupIcon className="h-5 w-5" />
              <span>Facebook</span>
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-2">Support</h3>
          <p className="text-gray-300">Email: support@accesspoints.com</p>
        </div>
      </div>
      <div className="mt-6 text-center text-gray-400">
        <p>© 2025 Access-points. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;