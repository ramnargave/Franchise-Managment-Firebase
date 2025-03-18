

const RestoDetailsLoader = () => {
  return (
    <div className="container mx-auto py-5 px-5">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="w-full h-64 bg-gray-300 animate-pulse rounded-lg shadow-lg"></div>
        </div>
        <div className="md:w-2/3">
          <div className="flex items-center justify-between">
            <div className="w-32 h-6 bg-gray-300 animate-pulse rounded-md"></div>
            <div className="w-20 h-6 bg-gray-300 animate-pulse rounded-md"></div>
          </div>
          <div className="mt-4">
            <div className="w-3/4 h-4 bg-gray-300 animate-pulse rounded-md mb-2"></div>
            <div className="w-1/2 h-4 bg-gray-300 animate-pulse rounded-md mb-2"></div>
            <div className="w-1/2 h-4 bg-gray-300 animate-pulse rounded-md mb-2"></div>
            <div className="w-1/3 h-4 bg-gray-300 animate-pulse rounded-md mb-2"></div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-3 gap-5 items-center">
          <div className="w-full h-0 border border-solid border-black"></div>
          <div className="min-w-12 bg-gray-300 animate-pulse rounded-lg flex items-center justify-around">
            <div className="font-bold text-white text-xl">Menu</div>
          </div>
          <div className="w-full h-0 border border-solid border-black"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 mt-5 p-1 md:p-10">
          {Array(4).fill().map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md hover:shadow-xl">
              <div className="w-full h-48 bg-gray-300 animate-pulse rounded-tl-xl rounded-tr-xl"></div>
              <div className="p-3">
                <div className="w-3/4 h-6 bg-gray-300 animate-pulse rounded-md mb-2"></div>
                <div className="w-1/2 h-4 bg-gray-300 animate-pulse rounded-md mb-2"></div>
                <div className="w-1/3 h-4 bg-gray-300 animate-pulse rounded-md mb-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestoDetailsLoader;
