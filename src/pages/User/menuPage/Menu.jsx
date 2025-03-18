import { useContext, useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import FoodCard from "../../../card/foodCard/FoodCard";
// import {restdata} from '../../../json/Resturants'
import { filterFoods } from "../../../utils/Filter";
import ChoosePop from "../../../components/ItemChoosePop/ChoosePop";
import BackHeader from "../../../components/BackHeader/BackHeader";
import myContext from "../../../context/data/myContext";
import { arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../../firebase/FirebaseConfig";
import MenuLoader from "../../../components/loadingComponents/MenuLoader";


function Menu() {

  // get categories 
    const [categories, setCategories] = useState([]);
    const [filterFood, setFilterFood] = useState( { name: '', rating: '', price:'', vegane:'', categories:'', });
    const [searchQuery, setSearchQuery] = useState('');
    const [pop, setPop] = useState(false);

    const context = useContext(myContext)
    const { food, loading, loggedUser} = context

    // add to cart 
    const [cart, setCart] = useState([]);
    const [cartFranchise, setCartFranchise] = useState(null); // Track किस franchise का food cart में है
    
    const handleAddToCart = (food) => {
      if (cart.length === 0) {
        // Cart खाली है, तो जो भी food add कर रहे हैं, उसी की franchise set कर दो
        setCart([food]);
        setCartFranchise(food.owneruid);
        console.log(cart)
        console.log(cartFranchise)
      } else {
        // अगर Cart में पहले से item है, तो चेक करें कि franchise वही है या नहीं
        if (cartFranchise === food.owneruid) {
          setCart([...cart, food]); 
          console.log(cart)
          console.log(cartFranchise) // Add to cart
        } else {
          alert(`You can only add items from "${cartFranchise}". Please clear your cart first.`);
        }
      }
    };

    const [countity,] = useState(1);
    const loggedUserr = loggedUser?.[0]?.id;
    
    const addtocart = async (dis) => {
      if (!loggedUserr) {
        alert("User not logged in!");
        return;
      }
    
      try {
        const q = doc(db, "users", loggedUserr);
        const userSnap = await getDoc(q);
    
        if (!userSnap.exists()) {
          alert("User not found in database!");
          return;
        }
    
        const userData = userSnap.data();
        const cart = userData.cart || [];
    
        // **Single Franchise Policy Check**
        const cartFranchise = cart.length > 0 ? cart[0].owneruid : null;
        if (cartFranchise && cartFranchise !== dis.owneruid) {
          alert("You can only order from one franchise at a time!");
          return;
        }
    
        // **Duplicate Food Check**
        const foodExists = cart.some((item) => item.foodId === dis.id);
        if (foodExists) {
          alert("This food is already in the cart!");
          return;
        }
    
        // **Add to Firestore with Timestamp**
        await updateDoc(q, {
          cart: arrayUnion({
            name: dis.name,
            image: dis.image,
            price: dis.finalprice,
            id: dis.id,
            franchiseId: dis.franchiseId,
            owneruid: dis.owneruid,
            quantity: 1,
            addedAt: Date.now(), // Timestamp added for auto-delete
          }),
        });
    
        console.log("Item added to cart successfully!");
    
        // **Schedule Auto-Delete**
        setTimeout(async () => {
          const updatedSnap = await getDoc(q);
          if (updatedSnap.exists()) {
            const updatedCart = updatedSnap.data().cart || [];
            const newCart = updatedCart.filter((item) => item.foodId !== dis.id);
            
            await updateDoc(q, { cart: newCart });
            console.log("Item removed from cart after 10 minutes");
          }
        }, 10 * 60 * 1000); // 10 minutes
    
      } catch (err) {
        console.error("Error adding to cart: ", err);
        alert("Error adding to cart: " + err.message);
      }
    };
    
  
    useEffect(() => {
      const getCategories = async () => {
        const q = query(collection(db, "categories",));
        const data = await getDocs(q);
        const categoriesList = data.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesList);
      };
  
      getCategories();
    }, []);

    const reset = () => {
      setFilterFood({name: '', rating: '', price:'', vegane:'', categories:''})
    }

    // filter 
      const filterfoods = filterFoods(food, filterFood, searchQuery,);



  return (
  <div className="relative" >
    <BackHeader/>
    <div className="w-full bg-slate-100 px-2">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 bg-white p-3 rounded-lg mt-5" >
          <div className='w-full flex items-center bg-white border border-solid border-gray-800 rounded-lg pl-1 pr-2' >
            <input type="text" onChange={(e) => setSearchQuery(e.target.value)}  placeholder='Discover the best food & drinks' className=' rounded-lg flex items-center pl-5 p-2 w-full text-black border-none focus:border-none focus:outline-none ' />
            <button type="submit"><SearchIcon   className='text-black ' /></button>
          </div>
          <div className="filter-main flex items-center gap-4 overflow-scroll" >
           {/* categories  */}
            <select value={filterFood.categories} onChange={(e) => setFilterFood({...filterFood, categories: e.target.value})} className="p-2 rounded-lg border border-black" id="">
              <option value="">Categories</option>
              {categories.map((c, i) => {
                return (
                  <option key={i} value={c.value} >{c.categoryName}</option>
                );
              })}
            </select>
            {/* price   */}
            <select value={filterFood.price}  onChange={(e) => setFilterFood({...filterFood, price: e.target.value})} className="p-2 rounded-lg border border-black">
              <option value="">Price</option>
              <option value="150">Below 150</option>
              <option value="Below_200">Below_200</option>
              <option value="300">Above 300</option>
            </select>
            {/* rating  */}
            <select value={filterFood.rating}  onChange={(e) => setFilterFood({...filterFood, rating: e.target.value})} className="p-2 rounded-lg border border-black" id="">
              <option value="">Rating</option>
              <option value="2">Below 2</option>
              <option value="Below_3">Below 3 </option>
              <option value="Above_3">Above 3 </option>
            </select>
            {/* veg nonveg  */}
            <select value={filterFood.vegane}  onChange={(e) => setFilterFood({...filterFood, vegane: e.target.value})} className="p-2 rounded-lg border border-black" id="">
              <option value="">Vegan</option>
              <option value="false">Non_Veg</option>
              <option value="true">Veg</option>
            </select>
            <div onClick={reset} className="bg-green-500 rounded-xl py-2 px-2 text-white font-semibold cursor-pointer hover:bg-green-400 "  >Reset</div>
          </div>
        </div>
        <div className='grid grid-cols-3 gap-5 mt-5 items-center' > <div className='w-full h-0 border border-solid border-black' ></div> <div className='min-w-12 bg-red-600 rounded-lg flex items-center justify-around' ><div className='font-bold text-white text-xl' >Menu</div></div> <div className='w-full h-0 border border-solid border-black' ></div> </div>
        {loading ? (<MenuLoader/>): (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 mt-5 pl-2 pr-2 lg:pl-24 lg:pr-24 " >
          {filterfoods.map((dis, index)=> {
              return (
                 <FoodCard key={index} dis={dis} setPop={setPop} addtocart={addtocart} />
              );
          })}
          </div>
        )}
    </div>
            {/* pop  */}
            {pop ? <ChoosePop setPop={setPop} /> : ""}

  </div>
  )
}

export default Menu