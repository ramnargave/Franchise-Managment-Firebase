function HomePartDeliv() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
        {/* First Card */}
        <div className="relative h-64 lg:h-72 rounded-lg overflow-hidden shadow-lg group">
          <div className="absolute inset-0 bg-[url('https://thumbs.dreamstime.com/b/delivery-boy-24015197.jpg')] bg-cover bg-center transition-transform duration-300 group-hover:scale-105"></div>
          <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all"></div>
          
          <div className="absolute top-0 left-32 md:left-40 transform -translate-x-1/2 bg-white px-3 py-1 rounded-bl-lg rounded-br-lg font-bold shadow-md">
            Earn more with lower fees
          </div>
          
          <div className="absolute bottom-8 left-5">
            <div className="text-orange-400 font-semibold">Signup as a Business</div>
            <div className="text-white font-bold text-2xl">Partner With us</div>
            <button className="mt-3 bg-orange-500 px-5 py-2 text-white font-semibold rounded-xl transition-transform transform hover:scale-105 shadow-md">
              Get Started
            </button>
          </div>
        </div>
        
        {/* Second Card */}
        <div className="relative h-64 lg:h-72 rounded-lg overflow-hidden shadow-lg group">
          <div className="absolute inset-0 bg-[url('https://images.thequint.com/quint-hindi/2021-09/5eec4fc3-86ed-46c0-a312-90072eb10712/quint_hindi_2021_07_ee7469f2_04a8_4f7e_9d93_149f05de3dfa_Untitled_design__21_.jpg')] bg-cover bg-center transition-transform duration-300 group-hover:scale-105"></div>
          <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all"></div>
          
          <div className="absolute top-0 left-32 md:left-40 transform -translate-x-1/2 bg-white px-3 py-1 rounded-bl-lg rounded-br-lg font-bold shadow-md">
            Avail exclusive perks
          </div>
          
          <div className="absolute bottom-8 left-5">
            <div className="text-blue-300 font-semibold">Signup as a Rider</div>
            <div className="text-white font-bold text-2xl">Ride With us</div>
            <button className="mt-3 bg-orange-500 px-5 py-2 text-white font-semibold rounded-xl transition-transform transform hover:scale-105 shadow-md">
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default HomePartDeliv;
  