/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import MyContext from "./myContext"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase/FirebaseConfig";

function myState(props) {

  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location,] = useState("")
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // SIGNUP FUNCTION
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMsg("All fields are required.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      // ager signup successfully ho gya to baki ka data databse me save karo 
      const user = userCredentials.user;

      await addDoc(collection(db, "users"), {
        name,
        email,
        password,
        location,
        cart: 0,
        phonenumber: "",
        roll: "user",
        address: "",
        favorite: "",
        uid: user.uid,
      });

      setSuccessMsg("Successfully Signed Up!");
      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        setIsOpen(false)
        setSuccessMsg("");
      }, 1000);
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setErrorMsg("Invalid email format.");
          break;
        case "auth/email-already-in-use":
          setErrorMsg("User already exists.");
          break;
        case "auth/weak-password":
          setErrorMsg("Password should be at least 6 characters.");
          break;
        default:
          setErrorMsg(error.message || "Signup failed. Try again.");
      }
    } finally {
      setLoading(false);
      setTimeout(() => setErrorMsg(""), 2000);
    }
  };

  // LOGIN FUNCTION HAI
  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email.trim() || !password.trim()) {
      setErrorMsg("All fields are required.");
      return;
    }
  
    setLoading(true);
    setErrorMsg("");
  
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredentials.user);
  
      setSuccessMsg("Login successful!");
      setEmail("");
      setPassword("");
  
      setTimeout(() => {
        setSuccessMsg("");
        setIsOpen(false);
      }, 1000);
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          setErrorMsg("Invalid email or password. Please try again.");
          break;
        case "auth/invalid-email":
          setErrorMsg("Invalid email format.");
          break;
        case "auth/user-not-found":
          setErrorMsg("User not found.");
          break;
        case "auth/wrong-password":
          setErrorMsg("Incorrect password.");
          break;
        default:
          setErrorMsg(error.message || "Login failed. Try again.");
      }
    } finally {
      setLoading(false);
      setTimeout(() => setErrorMsg(""), 3000);
    }
  };

  // user logged or not logged function hai
  const [homeloading, setHomeLoading] = useState(false);

  function getCurrentUser(){
        const [user, setUser] = useState('');
        // const userCollectionRef = collection(db, 'users')
        
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            setHomeLoading(true);
           auth.onAuthStateChanged(userlogged => {
            if(userlogged){
              const getUser = async () =>{
                const q = query(collection(db, 'users'), where("uid", "==", userlogged.uid))
                // console.log(q)
                const data = await getDocs(q)
                setUser(data.docs.map((doc)=> ({...doc.data(), id:doc.id})))
                setHomeLoading(false)
              }
              getUser();
            }
           else{
            setUser(null)
            setHomeLoading(false)
           }
           })
          }, [])
          return user
  }
  const loggedUser = getCurrentUser();
    // user logged or not logged function end ho gya
  

  // getfranchise and food 
  const [franchise, setFranchise] = useState([]);
  const [food, setFood] = useState([]);

  useEffect(() => {
    setLoading(true)
    const q = query(
      collection(db, "franchise"),
      where("open", "==", true)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const foodList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFranchise(foodList); 
      setLoading(false)
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const allfood = franchise.flatMap(franchiseItem => 
      franchiseItem.menu.map(foodItem => ({
        ...foodItem,
        franchiseName: franchiseItem.name 
      }))
    );
    setFood(allfood);
  }, [franchise]);


  return (
    <MyContext.Provider value={{isOpen, setIsOpen, isLogin, setIsLogin, name, setName, email, setEmail, password, setPassword, errorMsg, setErrorMsg, successMsg, setSuccessMsg, loading, setLoading, handleSignup, handleLogin, loggedUser, getCurrentUser, homeloading, setHomeLoading, franchise, setFranchise, food, setFood,}} >
        {props.children}
    </MyContext.Provider>
  )
}

export default myState