import { Dialog } from "@headlessui/react";
import { XIcon } from "lucide-react";
import { useContext } from "react";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../../firebase/FirebaseConfig";
// import { collection, addDoc, where, query, getDocs } from "firebase/firestore";
import myContext from "../../context/data/myContext";


function LoginSignup() {

  const context  = useContext(myContext);
  const {isOpen, setIsOpen, isLogin, setIsLogin, name, setName, email, setEmail, password, setPassword, errorMsg, successMsg, loading,  handleSignup, handleLogin, loggedUser, getCurrentUser} = context;


  

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{isLogin ? "Login" : "Sign Up"}</h2>
          <button onClick={() => setIsOpen(false)}>
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <form className="space-y-4">
          {/* SUCCESS & ERROR MESSAGES */}
          {successMsg && <div className="w-full text-green-500 text-center">{successMsg}</div>}
          {errorMsg && <div className="w-full text-red-600 text-center">{errorMsg}</div>}

          {!isLogin && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full p-2 border rounded"
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded"
          />

          {/* LOGIN / SIGNUP BUTTON */}
          {isLogin ? (
            <button type="submit" onClick={handleLogin} className="w-full bg-red-500 text-white py-2 rounded" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          ) : (
            <button type="submit" onClick={handleSignup} className="w-full bg-red-500 text-white py-2 rounded" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          )}
        </form>

        {/* TOGGLE BETWEEN LOGIN & SIGNUP */}
        <p className="text-sm text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-red-500 font-semibold">
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </Dialog.Panel>
    </Dialog>
  );
}

export default LoginSignup;
