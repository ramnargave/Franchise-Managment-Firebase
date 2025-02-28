import { useState } from 'react';
import BackHeader from '../../../components/BackHeader/BackHeader';

const CartPage = () => {
  const [cartItems,] = useState([
    {
      id: 1,
      name: 'Margherita Pizza',
      price: 10.99,
      quantity: 2,
      image: 'https://www.waiter.com/blog/wp-content/uploads/2015/08/Pepperoni-Pizza-2.jpg',
    },
    {
      id: 2,
      name: 'Pepperoni Pizza',
      price: 12.99,
      quantity: 1,
      image: 'https://www.waiter.com/blog/wp-content/uploads/2015/08/Pepperoni-Pizza-2.jpg',
    },
    {
      id: 3,
      name: 'Veggie Burger',
      price: 8.99,
      quantity: 3,
      image: 'https://www.waiter.com/blog/wp-content/uploads/2015/08/Pepperoni-Pizza-2.jpg',
    },
  ]);





  return (
<>
<BackHeader/>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-4 hover:bg-gray-50 transition duration-300"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg mr-4 object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    className="px-3 py-1 text-gray-500 hover:text-gray-700 transition duration-300"
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    className="px-3 py-1 text-gray-500 hover:text-gray-700 transition duration-300"
                  >
                    +
                  </button>
                </div>
                <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  className="text-red-500 hover:text-red-700 transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>333</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$5.00</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>$2.00</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>$656</span>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
</>
  );
};

export default CartPage;