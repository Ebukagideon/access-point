import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  // Function to generate WhatsApp message with cart items
  const generateWhatsAppMessage = () => {
    if (cartItems.length === 0) return 'Hello, I would like to discuss my cart, but it is currently empty.';

    const itemList = cartItems
      .map((item, index) => 
        `${index + 1}. ${item.name} (${item.brand}, ${item.model}, ${item.year}, ${item.category} - ${item.subcategory}) - Quantity: ${item.quantity}`
      )
      .join('\n');
    return `Hello, I would like to discuss my cart:\n${itemList}\nPlease provide pricing and further details.`;
  };

  // Function to handle WhatsApp redirect
  const handleContinueOnWhatsApp = () => {
    setIsLoading(true);
    const message = encodeURIComponent(generateWhatsAppMessage());
    const phoneNumber = 'YOUR_CUSTOMER_CARE_PHONE_NUMBER'; // Replace with your customer care WhatsApp number (e.g., '2341234567890')
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setTimeout(() => setIsLoading(false), 1000); // Simulate loading delay
  };

  // Handle quantity updates with loading state
  const handleUpdateQuantity = (itemId, newQuantity) => {
    setIsLoading(true);
    updateQuantity(itemId, newQuantity);
    setTimeout(() => setIsLoading(false), 500); // Simulate loading delay
  };

  // Handle remove with loading state
  const handleRemoveItem = (itemId) => {
    setIsLoading(true);
    removeFromCart(itemId);
    setTimeout(() => setIsLoading(false), 500); // Simulate loading delay
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <header className="mb-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Your Cart</h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Review your selected spare parts. Prices are negotiable—contact us to discuss!
        </p>
      </header>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">Your cart is empty.</p>
          <Link
            to="/store"
            className="mt-4 inline-block bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-gray-700 transition text-sm sm:text-base"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 border-b"
              >
                <div className="flex-1 flex items-center space-x-4">
                  <img
                    src={item.image || 'https://via.placeholder.com/50'} // Use product image or placeholder
                    alt={`${item.name} image`}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.brand}</p>
                    <p className="text-gray-600 text-sm">{item.model} ({item.year})</p>
                    <p className="text-gray-600 text-sm">{item.category} - {item.subcategory}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={isLoading}
                      className="bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400 transition disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="text-gray-800 text-sm">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      disabled={isLoading}
                      className="bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400 transition disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={isLoading}
                    className="bg-red-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-md hover:bg-red-600 transition text-sm disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center space-x-8">
            <Link
              to="/store"
              className="bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-gray-700 transition text-sm sm:text-base"
            >
              Continue Shopping
            </Link>
            <button
              onClick={handleContinueOnWhatsApp}
              disabled={isLoading}
              className="bg-green-500 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-green-600 transition text-sm sm:text-base disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Continue on WhatsApp'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;