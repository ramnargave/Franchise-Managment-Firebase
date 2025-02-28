function MenuLoader() {
    return (
      <>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 mt-6 pl-2 pt-5 pr-2 lg:pl-16 lg:pr-16 bg-gradient-to-r from-purple-200 to-pink-100 min-h-screen">
          {Array(10).fill().map((_, i) => {
            return (
              <div key={i} className="group relative hover:scale-105 transition-transform duration-500 transform cursor-pointer rounded-xl">
                {/* Image Container with Gradient & Hover Effect */}
                <div className="w-full h-44 md:h-56 lg:h-72 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 rounded-xl shadow-xl overflow-hidden group-hover:shadow-2xl transition-shadow duration-300">
                  {/* Optional Image or Icon could be added */}
                  <div className="w-full h-full bg-gradient-to-t from-red-400 to-transparent opacity-40 group-hover:opacity-0 transition-opacity duration-300"></div>
                </div>
  
                <div className="p-4 pt-5">

                  <div className="w-36 h-8 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 rounded-lg animate-pulse mb-3"></div>
  
                  <p className="w-20 h-8 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 rounded-lg animate-pulse mb-3"></p>
  
                  <div className="w-32 h-8 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 rounded-lg animate-pulse mb-4"></div>
  
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
  
  export default MenuLoader;
  