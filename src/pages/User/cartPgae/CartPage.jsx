import { useContext, useEffect, useState } from 'react';
import BackHeader from '../../../components/BackHeader/BackHeader';
import myContext from '../../../context/data/myContext';
import CartLoader from '../../../components/loadingComponents/CartLoader';
import { doc, getDoc, updateDoc, addDoc, collection, } from 'firebase/firestore';
import { db } from '../../../firebase/FirebaseConfig';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const context = useContext(myContext);
  const { loggedUser } = context;

  const [cartItems, setCartItems] = useState([]);
  const loggedUserId = loggedUser?.[0]?.id;

  useEffect(() => {
    if (!loggedUserId) return;

    const fetchCart = async () => {
      try {
        const userRef = doc(db, "users", loggedUserId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setCartItems(userData.cart || []);
        }
      } catch (err) {
        console.error("Error fetching cart: ", err);
      }
    };

    fetchCart();
  }, [loggedUserId]);

  // 🛑 Quantity Update Function 🛑
  const updateQuantity = async (itemId, newQuantity) => {
    if (!loggedUserId) return;
    try {
      const userRef = doc(db, "users", loggedUserId);
      const updatedCart = cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCart);
      await updateDoc(userRef, { cart: updatedCart });
    } catch (error) {
      console.error("Error updating quantity: ", error);
    }
  };

    // 🛑 Delete Function - Cart से आइटम हटाने के लिए 🛑
  const handleDeleteItem = async (itemId) => {
    try {
      const updatedCart = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedCart); // UI से हटाएं

      const userRef = doc(db, "users", loggedUserId);
      await updateDoc(userRef, { cart: updatedCart }); // Firestore में अपडेट करें

    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  // Buy Now function
  const handleBuyNow = async () => {
    if (!loggedUserId || cartItems.length === 0) return;
  
    try {
      const userRef = doc(db, "users", loggedUserId);
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists()) {
        const userData = userSnap.data();
  
        const orderData = {
          userId: loggedUserId,
          userName: userData.name,
          userEmail: userData.email,
          orderItems: cartItems,
          totalAmount: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + 5 + 2,
          orderDate: new Date().toISOString(),
          status: "Pending",
        };
  
        // 🔥 Firestore में "buy" कलेक्शन में ऑर्डर सेव करो
        await addDoc(collection(db, "buy"), orderData);
  
        // 🔥 फ्रैंचाइज़ के टोटल सेल्स अपडेट करें
        for (const item of cartItems) {
          console.log(item)
          const franchiseRef = doc(db, "franchise", item.franchiseId);
          const franchiseSnap = await getDoc(franchiseRef);
          
          if (franchiseSnap.exists()) {
            const franchiseData = franchiseSnap.data();
            const updatedTotalSell = (franchiseData.totalorder || 0) + item.quantity;
            await updateDoc(franchiseRef, { totalorder: updatedTotalSell });
  
            // 🔥 फ्रैंचाइज़ के Menu में जाकर फूड की `totalsell` अपडेट करें
           // 🔥 Menu के अंदर जाकर सही Food ID को अपडेट करें
          const updatedMenu = franchiseData.menu.map((foodItem) => {
            if (foodItem.id === item.id) {
              return { ...foodItem, totalorder: (foodItem.totalorder || 0) + item.quantity };
            }
            return foodItem;
          });

          // 🔥 Firestore में अपडेट करें
          await updateDoc(franchiseRef, { menu: updatedMenu });

          }
        }
  
        alert("✅ Order Placed Successfully!");
      // ✅ Optional: Order प्लेस होने के बाद Cart Empty कर सकते हो
        await updateDoc(userRef, { cart: [] });
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  

  if (!loggedUserId) {
    return <CartLoader />;
  }

  if (cartItems.length === 0) {
    return (
      <div className='w-full h-screen flex flex-col items-center justify-center'>
        <div className='text-gray-600 font-bold text-2xl'>Your cart is empty.</div>
        <Link to={'/menu'} className='p-2 rounded-lg bg-blue-700 text-xl font-bold text-white'>Shopping...</Link>
      </div>
    );
  }

  return (
    <>
      <BackHeader />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">{loggedUser[0].name} Your Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b py-4 hover:bg-gray-50 transition duration-300">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg mr-4 object-cover" />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="px-2 py-1 bg-gray-200 rounded">-</button>
                  <p className="text-lg font-semibold">{item.quantity}</p>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                  <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                  onClick={() => handleDeleteItem(item.id)}
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
                <span>${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
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
                  <span>${(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + 5 + 2).toFixed(2)}</span>
                </div>
              </div>
              <button onClick={handleBuyNow} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300">
                Buy Now 🛒
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
