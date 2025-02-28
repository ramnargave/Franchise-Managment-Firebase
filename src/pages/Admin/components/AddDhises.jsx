import { useState, useEffect, useContext } from "react";
import { doc, getDoc, updateDoc, arrayUnion, query, collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/FirebaseConfig";
import myContext from "../../../context/data/myContext";
import LoadingComponents from './../../../components/loadingComponents/LoadingComponents';

function AddDishes({ franchiseId }) {
  const [foodName, setFoodName] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [finalprice, setFinalPrice] = useState(0);
  const [isVeg, setIsVeg] = useState(true);
  const [foodImage, setFoodImage] = useState("");
  const [foodDescription, setFoodDescription] = useState("");
  const [category, setCategory] = useState("main_mourse");
  const [cuisine, setCuisine] = useState("indain");
  const [OccasionCategories, setOccasionCategories] = useState("all");
  const [totalorder] = useState(0)

  const [loading, setLoading] = useState(false); // Loading state for button
  const [isOwner, setIsOwner] = useState(false); // To check if user is franchise owner

  //context se login user ki details
  const context = useContext(myContext);
  const { loggedUser } = context;

  // login user check kar rahe hai
  const user = loggedUser && loggedUser[0] ? loggedUser[0] : null;

  // uyaha ye dekh rahe hai ki jo user login hai uski franchise hai ya nhi hai
  useEffect(() => {
    const checkOwner = async () => {
      if (!user) return; // ager user login nhi hai to

      const franchiseRef = doc(db, "franchise", franchiseId); //yaha location bata rahe hai or sath me franchise ki id bhi le rahe hai
      const franchiseSnap = await getDoc(franchiseRef); // data fetch kar rahe hai firestore se

      if (franchiseSnap.exists()) {
        const franchiseData = franchiseSnap.data();
        if (franchiseData.owneruid === user.uid) {
          setIsOwner(true); // ager user owner hai true kar do mtlb ki ager user franchise ka owner hai to use hame food add karne ka form dikhayenge
        }
      }
    };

    checkOwner(); // Call kar rahe hai function ko
  }, [user, franchiseId]); // ager user ya franchiID me jaise hi kuch change hota hai to useEffect fir se run karega

  // disesh add karne ka function hai
  const addFoodToMenu = async (e) => {
    
    e.preventDefault();

    if (!isOwner) {
      alert("Aap is franchise ke owner nahi hain!");
      return;
    }

      // Check if all fields are filled
  if (
    !foodName ||
    !originalPrice ||
    !discountPercentage ||
    !finalprice ||
    !foodImage ||
    !foodDescription
  ) {
    alert("Sabhi fields ko bharna jaruri hai!");
    return;
  }

    setLoading(true); // Set loading to true while data is being uploaded
    try {
      const franchiseRef = doc(db, "franchise", franchiseId); // kaha dalna hai data uske liye

      await updateDoc(franchiseRef, {
        menu: arrayUnion({
          id: Date.now().toString(),
          name: foodName,
          originalPrice: parseFloat(originalPrice),
          discountPercentage: parseFloat(discountPercentage),
          totalorder: parseFloat(totalorder),
          finalprice: parseFloat(finalprice),
          isVeg,
          description: foodDescription,
          image: foodImage,
          category,
          cuisine,
          OccasionCategories,
          owneruid: loggedUser[0].uid,
        }),
      });

      alert("Food item successfully added!");
      setLoading(false);
      setFoodName("");
      setOriginalPrice(0);
      setDiscountPercentage(0);
      setFinalPrice(0);
      setIsVeg(true);
      setFoodImage("");
      setFoodDescription("");
      setCategory("main_mourse");
      setCuisine("indain");
      setOccasionCategories("all");
    } catch (error) {
      console.error("Error adding food:", error.message);
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

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

   if(loading === true) {
    return <LoadingComponents/>
   }
  return (
    <div>
      <div className="w-full flex items-center justify-center text-3xl font-extrabold">
        Create Franchise
      </div>
      <form action="" className="mt-5">
        {/* basic information  */}
        <div>
          <div className="text-xl font-bold">Basic Information</div>
          <div className="grid grid-cols-3 gap-5 mt-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Food Name
              </label>
              <input
                type="text"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter Food Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                OriginalPrice
              </label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter Orginal Price"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                DiscountPercentage
              </label>
              <input
                type="number"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter DiscountPercentage "
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Final Price
              </label>
              <input
                type="text"
                value={finalprice}
                onChange={(e) => setFinalPrice(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter Final Price"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Veg or Not
              </label>
              <select
                name=""
                id=""
                value={isVeg}
                onChange={(e) => setIsVeg(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              >
                <option value="true">Veg</option>
                <option value="false">Non_Veg</option>
              </select>
            </div>
            {/* <div>
          <label className="block text-sm font-semibold text-gray-700">Franchise Image</label>
          <input
            type="file"
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div> */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Image Url
              </label>
              <input
                type="text"
                value={foodImage}
                onChange={(e) => setFoodImage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter Image Url"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Description
              </label>
              <textarea
                type="text"
                value={foodDescription}
                onChange={(e) => setFoodDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Description"
                required
              />
            </div>
          </div>
        </div>

        {/* basic information  */}
        <div>
          <div className="text-xl font-bold">Basic Information</div>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {/* categories  */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Category
              </label>
              <select
                name=""
                id=""
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              >
                {categoriess.map((cat) => (
                  <option key={cat.value} value={cat.value} >{cat.categoryName}</option>
                ))}
              </select>
            </div>
            {/* cuisine  */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Cuisine
              </label>
              <select
                name=""
                id=""
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              >
                <option value="indain">Indain</option>
                <option value="chinese">Chinese</option>
                <option value="italian">Italian</option>
                <option value="mexican">Mexican</option>
                <option value="american">American</option>
                <option value="middle_eastern ">Middle Eastern </option>
                <option value="thai">Thai</option>
              </select>
            </div>
            {/* 🎉 Special Occasion Categories:  */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
              🎉 Special Occasion Categories:
              </label>
              <select
                name=""
                id=""
                value={OccasionCategories}
                onChange={(e) => setOccasionCategories(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              >
                <option value="all">All</option>
                <option value="birthday">Birthday Specials 🎂</option>
                <option value="wedding">Wedding & Events 💍</option>
                <option value="party">Party Platters 🎊</option>
                <option value="festival">Festival Specials 🎄🎉 (Holi, Diwali, Christmas, Eid)</option>
                <option value="seasonal">Seasonal Foods 🍂🌸 (Winter Warmers, Summer Coolers)</option>
              </select>
            </div>
          </div>
        </div>
      </form>
      {/* Add button  */}
      <div className="flex items-center justify-center" >
      <button onClick={addFoodToMenu} className="bg-blue-600 py-3 px-5 rounded-xl mt-5 flex items-center justify-around font-bold" >Add</button>
      </div>
    </div>

    // <div className="w-full flex items-center justify-center">
    //   <div className="">
    //   <div className="w-full flex items-center justify-center text-3xl font-extrabold" >Create Franchise</div>
    //     {!isOwner ? (
    //       <p className="text-red-500">Aap is franchise ke owner nahi hain!</p>
    //     ) : (
    //       <form onSubmit={addFoodToMenu}>
    //         <input type="text" value={foodName} onChange={(e) => setFoodName(e.target.value)} placeholder="Food Name" className="w-full p-2 border rounded mb-2" required />
    //         <input type="number" value={foodPrice} onChange={(e) => setFoodPrice(e.target.value)} placeholder="Price" className="w-full p-2 border rounded mb-2" required />
    //         <textarea value={foodDescription} onChange={(e) => setFoodDescription(e.target.value)} placeholder="Description" className="w-full p-2 border rounded mb-2" required></textarea>
    //         <input type="text" value={foodImage} onChange={(e) => setFoodImage(e.target.value)} placeholder="Image URL" className="w-full p-2 border rounded mb-2" required />
    //         <button type="submit" className="w-full p-2 bg-green-500 text-white font-bold rounded">
    //           {loading ? "Adding..." : "Add Food"}
    //         </button>
    //       </form>
    //     )}
    //   </div>
    // </div>
  );
}

export default AddDishes;
