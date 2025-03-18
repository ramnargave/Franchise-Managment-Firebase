import { useEffect, useState } from "react";
import BackHeader from "../../../components/BackHeader/BackHeader";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../firebase/FirebaseConfig";
import { useParams } from "react-router-dom";
import RestoDetailsLoader from "../../../components/loadingComponents/RestoDetailsLoader";

const RestaurantsDetail = () => {
  const { id } = useParams();
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "franchise"),
      where("owneruid", "==", id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const restaurantList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRestaurants(restaurantList);
    });

    return () => unsubscribe();
  }, [id]);

  const restaurant = restaurants[0];

  if (!restaurant) {
    return <RestoDetailsLoader/>;
  }

  return (
    <>
      <BackHeader />
      <div className="container mx-auto py-5 px-5">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img
              src={restaurant.imageurl || 'https://th.bing.com/th/id/OIP.T56Bd63N3eTV-zxPRwgPVQAAAA?rs=1&pid=ImgDetMain'}
              alt={restaurant.name || 'Restaurant Image'}
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-2/3">
            <div className="flex items-center justify-between">
              <h1 className="md:text-xl lg:text-2xl font-bold text-red-600">{restaurant.name}</h1>
              {/* Active Status */}
              {restaurant.open ? (
                <div className="p-2 pl-3 pr-3 bg-green-600 text-white rounded-lg flex justify-center font-semibold text-xs md:text-lg">
                  Open
                </div>
              ) : (
                <div className="p-2 pl-3 pr-3 bg-red-600 text-white rounded-lg flex justify-center font-semibold text-xs md:text-lg">
                  Close
                </div>
              )}
            </div>
            <p className="text-lg text-gray-600 mt-2">{restaurant.description.length > 50 ? restaurant.description.substring(0, 50) + '...' : restaurant.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, eaque!'}</p>
            <div className="mt-4">
              <strong>Contact Details:-</strong>
              <p className="font-semibold">Address: {restaurant.location || 'Not available'}</p>
              <p className="font-semibold">Opening Hours: {restaurant.openingHours || '10 AM - 7 PM'}</p>
              <p className="font-semibold">Phone: {restaurant.phone || 'Not available'}</p>
              <p className="font-semibold">Email: {restaurant.email || 'Not available'}</p>
              <p className="font-semibold">Ratings: {restaurant.ratings || 'Not available'}</p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-3 gap-5 items-center">
            <div className="w-full h-0 border border-solid border-black"></div>
            <div className="min-w-12 bg-green-600 rounded-lg flex items-center justify-around">
              <div className="font-bold text-white text-xl">Menu</div>
            </div>
            <div className="w-full h-0 border border-solid border-black"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 mt-5 p-1 md:p-10">
            {/* Render menu items dynamically */}
            {restaurant.menu && restaurant.menu.length > 0 ? (
              restaurant.menu.map((item, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md hover:shadow-xl">
                  <div className="w-full h-48 rounded-tl-xl rounded-tr-xl">
                    <img
                      src={item.image || 'https://th.bing.com/th/id/OIP.2dhr5Ln6cMHIu9SmwE_uBgHaE7?rs=1&pid=ImgDetMain'}
                      alt={item.name || 'Menu Item Image'}
                      className="w-full h-full rounded-tl-xl rounded-tr-xl"
                    />
                  </div>
                  <div className="p-3">
                    <div className="text-gray-700 text-xl font-bold">{item.name}</div>
                    <div className="text-gray-600 text-sm">{item.description.length > 15 ? item.description.substring(0, 15) + '...' : item.description || 'Description not available'}</div>
                    <div className="flex justify-between items-center">
                      <div className="text-gray-600 text-lg font-bold">₹ {item.finalprice || 'Not available'}</div>
                      <div className="font-bold p-2 bg-orange-700 rounded-xl text-white">Order</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No menu items available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantsDetail;
