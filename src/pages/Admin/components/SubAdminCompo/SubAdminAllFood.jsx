import { useContext, useEffect, useState } from "react";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../../../firebase/FirebaseConfig";
import myContext from "../../../../context/data/myContext";

const SubAdminFoodList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const context = useContext(myContext);
  const { loggedUser } = context;
  const id = loggedUser?.[0]?.uid;

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        if (!id) return; // Ensure user is logged in

        setLoading(true);

        const q = query(collection(db, "franchise"), where("owneruid", "==", id));
        const querySnapshot = await getDocs(q);
        const foods = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const allFoodItems = foods.flatMap((food) => food.menu);
        setFoodItems(allFoodItems);
      } catch (err) {
        setError("Failed to fetch food items.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, [id]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const q = query(collection(db, 'categories'));
        const data = await getDocs(q);
        const categoriesList = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesList);
      } catch (err) {
        setError("Failed to fetch categories.");
      }
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
      switch (sortOption) {
        case "price-low":
          return a.finalprice - b.finalprice;
        case "price-high":
          return b.finalprice - a.finalprice;
        case "popularity":
          return b.totalorder - a.totalorder;
        default:
          return 0;
      }
    });

    const deleteFoodItem = async (foodId) => {
        try {
          const franchiseQuery = query(collection(db, "franchise"), where("owneruid", "==", id));
          const querySnapshot = await getDocs(franchiseQuery);
      
          if (querySnapshot.empty) {
            console.error("No matching franchise found");
            return;
          }
      
          const franchiseDoc = querySnapshot.docs[0]; // Get first matching document
          const franchiseRef = doc(db, "franchise", franchiseDoc.id);
          const franchiseData = franchiseDoc.data();
      
          const updatedMenu = franchiseData.menu.filter((item) => item.id !== foodId);
      
          await updateDoc(franchiseRef, { menu: updatedMenu });
      
          // Update UI
          setFoodItems(updatedMenu);
          console.log(`Item with ID ${foodId} deleted successfully!`);
        } catch (error) {
          console.error("Error deleting item: ", error);
        }
      };

      const [editFood, setEditFood] = useState(null);
const [editName, setEditName] = useState("");
const [editPrice, setEditPrice] = useState("");
const [editCategory, setEditCategory] = useState("");
const openEditModal = (food) => {
    setEditFood(food);
    setEditName(food.name);
    setEditPrice(food.finalprice);
    setEditCategory(food.category);
  };

  const updateFoodItem = async () => {
    try {
      if (!editFood) return;
  
      const franchiseQuery = query(collection(db, "franchise"), where("owneruid", "==", id));
      const querySnapshot = await getDocs(franchiseQuery);
  
      if (querySnapshot.empty) {
        console.error("No matching franchise found");
        return;
      }
  
      const franchiseDoc = querySnapshot.docs[0];
      const franchiseRef = doc(db, "franchise", franchiseDoc.id);
      const franchiseData = franchiseDoc.data();
  
      const updatedMenu = franchiseData.menu.map((item) =>
        item.id === editFood.id
          ? { ...item, name: editName, finalprice: editPrice, category: editCategory }
          : item
      );
  
      await updateDoc(franchiseRef, { menu: updatedMenu });
  
      setFoodItems(updatedMenu);
      setEditFood(null); // Close modal
      console.log(`Item with ID ${editFood.id} updated successfully!`);
    } catch (error) {
      console.error("Error updating item: ", error);
    }
  };
  
  

      

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

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
            value={filterCategory}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.value}>
                {category.categoryName}
              </option>
            ))}
          </select>
          <select
            className="w-full sm:w-1/4 p-2 border rounded-md shadow-sm"
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
          >
            <option value="default">Sort By</option>
            <option value="price-low">💰 Price: Low to High</option>
            <option value="price-high">💰 Price: High to Low</option>
            <option value="popularity">🔥 Most Popular</option>
          </select>
        </div>

       {/* 🍕 Food Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {filteredFood.length > 0 ? (
    filteredFood.map((food) => (
      <div key={food.id} className="bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={food.image || "https://via.placeholder.com/300"}
          alt={food.name}
          className="w-full h-40 object-cover"
        />

        <div className="p-4">
          <h2 className="text-lg font-bold">{food.name}</h2>
          <p className="text-gray-500">⭐ {food.rating || 0}/5 • 🛒 {food.totalsell} Sold</p>
          <p className="text-green-600 font-bold">₹{food.finalprice}</p>

          {/* ✏️ Edit & ❌ Delete Buttons */}
          <div className="flex justify-between mt-3">
            <button
              onClick={() => openEditModal(food)}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => deleteFoodItem(food.id)}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              ❌ Delete
            </button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500 mt-6">😢 No food items found.</p>
  )}
</div>

{editFood && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-md w-96">
      <h2 className="text-xl font-bold mb-4">Edit Food Item</h2>

      <input
        type="text"
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
        placeholder="Food Name"
        className="w-full p-2 border rounded-md mb-2"
      />

      <input
        type="number"
        value={editPrice}
        onChange={(e) => setEditPrice(e.target.value)}
        placeholder="Price"
        className="w-full p-2 border rounded-md mb-2"
      />

      <select
        value={editCategory}
        onChange={(e) => setEditCategory(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
      >
       {categories.map((category) => (
              <option key={category.id} value={category.value}>
                {category.categoryName}
              </option>
            ))}
      </select>

      <div className="flex justify-between">
        <button onClick={() => setEditFood(null)} className="px-4 py-2 bg-gray-500 text-white rounded-md">
          Cancel
        </button>
        <button onClick={updateFoodItem} className="px-4 py-2 bg-green-500 text-white rounded-md">
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}


      </div>
    </div>
  );
};

export default SubAdminFoodList;
