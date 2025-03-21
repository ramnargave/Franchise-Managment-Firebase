import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../../firebase/FirebaseConfig";


const AdminFoodList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    const fetchFoodItems = async () => {
      const querySnapshot = await getDocs(collection(db, "franchise"));
      const foods = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const allfood = foods.flatMap(food => food.menu)
      setFoodItems(allfood);
    };

    fetchFoodItems();
  }, []);

       // getCategories 
    const [categoriess, setCategories] = useState([]);
  
     useEffect(() => {
        const getCategories = async () => {
          const q = query(collection(db, 'categories'));
          const data = await getDocs(q);
          const categoriesList = data.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCategories(categoriesList);
        };
  
        getCategories();
     }, []);

  // 🔍 Search & Filter Logic
  const filteredFood = foodItems
    .filter((item) => 
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterCategory === "all" || item.category === filterCategory)
    )
    .sort((a, b) => {
      if (sortOption === "price-low") return a.finalprice - b.finalprice;
      if (sortOption === "price-high") return b.finalprice - a.finalprice;
      if (sortOption === "popularity") return b.totalorder - a.totalorder;
      return 0;
    });


  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-center mb-6">🍕 Total Food Items</h1>

        {/* 🔍 Search & Filter Section */}
        <div className="flex flex-wrap gap-4 justify-between mb-6">
          <input
            type="text"
            placeholder="🔍 Search Food..."
            className="w-full sm:w-1/3 p-2 border rounded-md shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="w-full sm:w-1/4 p-2 border rounded-md shadow-sm"
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categoriess.map((categories, i) => (
                <option key={i} value={categories.value}>{categories.categoryName}</option>
            ))}
          </select>
          <select
            className="w-full sm:w-1/4 p-2 border rounded-md shadow-sm"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Sort By</option>
            <option value="price-low">💰 Price: Low to High</option>
            <option value="price-high">💰 Price: High to Low</option>
            <option value="popularity">🔥 Most Popular</option>
          </select>
        </div>

        {/* 🍕 Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredFood.map((food) => (
            <div key={food.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              {/* 🍕 Food Image */}
              <img
                src={food.image || "https://via.placeholder.com/300"}
                alt={food.name}
                className="w-full h-40 object-cover"
              />

              {/* 📊 Food Details */}
              <div className="p-4">
                <h2 className="text-lg font-bold">{food.name}</h2>
                <p className="text-gray-500">⭐ {food.rating || 0}/5 • 🛒 {food.totalorder} Sold</p>
                <p className="text-green-600 font-bold">₹{food.finalprice}</p>
              </div>
            </div>
          ))}
        </div>

        {/* No Data Message */}
        {filteredFood.length === 0 && (
          <p className="text-center text-gray-500 mt-6">😢 No food items found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminFoodList;
