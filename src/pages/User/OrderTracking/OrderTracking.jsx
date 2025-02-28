

const OrderTracking = () => {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Delivery Page</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/*Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Order ID: #12345</h3>
            <p className="text-gray-600 mb-2">Customer: ram</p>
            <p className="text-gray-600 mb-4">Address: 123 Main St, Pune, India</p>
  
            {/* Status */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-800">
                Pending
              </span>
            </div>
          </div>
  
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Order ID: #67890</h3>
            <p className="text-gray-600 mb-2">Customer: praveg</p>
            <p className="text-gray-600 mb-4">Address: 456 Elm St, Mumbai, India</p>
  
            {/* status */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">
                In Transit
              </span>
            </div>
          </div>
  
          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Order ID: #11223</h3>
            <p className="text-gray-600 mb-2">Customer: prachi</p>
            <p className="text-gray-600 mb-4">Address: 789 Oak St, Bangalore, India</p>
  
            {/* status */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                Delivered
              </span>
            </div>
          </div>
        </div>
  
        {/* Map lagana hai abhi */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Delivery Route Tracking</h2>
          <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Map</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default OrderTracking;