import React from 'react';

const CartLoader = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        <div className="w-48 h-8 bg-gray-300 rounded-md animate-pulse mx-auto"></div>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {/* Cart Item Loader */}
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b py-4 hover:bg-gray-50 transition duration-300"
            >
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-300 rounded-lg animate-pulse"></div>
                <div className="ml-4 space-y-3">
                  <div className="w-32 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                  <div className="w-24 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <button className="px-3 py-1 text-gray-500 hover:text-gray-700 transition duration-300">
                    <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
                  </button>
                  <div className="w-12 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                  <button className="px-3 py-1 text-gray-500 hover:text-gray-700 transition duration-300">
                    <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
                  </button>
                </div>
                <div className="w-16 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                <button className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Loader */}
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
          <div className="w-32 h-4 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="w-24 h-4 bg-gray-300 rounded-md animate-pulse"></div>
              <div className="w-16 h-4 bg-gray-300 rounded-md animate-pulse"></div>
            </div>
            <div className="flex justify-between">
              <div className="w-24 h-4 bg-gray-300 rounded-md animate-pulse"></div>
              <div className="w-16 h-4 bg-gray-300 rounded-md animate-pulse"></div>
            </div>
            <div className="flex justify-between">
              <div className="w-24 h-4 bg-gray-300 rounded-md animate-pulse"></div>
              <div className="w-16 h-4 bg-gray-300 rounded-md animate-pulse"></div>
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between font-bold">
                <div className="w-24 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                <div className="w-16 h-4 bg-gray-300 rounded-md animate-pulse"></div>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 opacity-50 cursor-not-allowed">
              <div className="w-24 h-4 bg-gray-300 rounded-md animate-pulse mx-auto"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartLoader;
