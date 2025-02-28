import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../../firebase/FirebaseConfig";
import LoadingComponents from "../../../components/loadingComponents/LoadingComponents";


function SubAdminCreateForm() {
    const [loading, setLoading] =useState(false)
    const [subAdminEmail, setSubAdminEmail] = useState("");
    const [subAdminPassword, setSubAdminPassword] = useState("");
    const [subAdminPhone, setSubAdminPhone] = useState("");
    const [name, setName] = useState("");
    const [franchise] = useState(0)

    const handleCreateSubAdmin = async () => {
        if (!name.trim() || !subAdminEmail.trim() || !subAdminPassword.trim() || !subAdminPhone.trim()) {
            alert("All fields are required.");
            return;
          }

        setLoading(true);
        try {
          const adminUser = auth.currentUser;
          if (!adminUser || !adminUser.email) {
            throw new Error("Admin user not found. Please log in again.");
          }
           
          const idToken = await adminUser.getIdToken(true);
    
          // Firebase REST API SE HAME SUB-ADMIN BANA RAHE HAI ADMIN KO LOGOUT KIYE BINA
          const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAEMJaLSEsfihiCznw-ZjCORXGghTup2w8`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: subAdminEmail,
              password: subAdminPassword,
              returnSecureToken: false, // YAHA TOKEN RETURN NHI KAREGA TO ADMIN LOGOUT NHI HOGA
            }),
          });
    
          const data = await response.json();
          if (data.error) {
            throw new Error(data.error.message);
          }
    
          //  Sub-Admin KO Firestore SAVE KAR RAHE HAI
          await addDoc(collection(db, "users"), {
            name: name,
            email: subAdminEmail,
            number: subAdminPhone,
            roll: "sub-admin",
            franchise: franchise,
            uid: data.localId, // UID SAVE KARA RAHE HAI
            date: new Date().getTime(),
          });

          setLoading(false)
    
          alert("Sub-Admin Created Successfully!");
    
          // Form Fields Clear
          setSubAdminEmail("");
          setSubAdminPassword("");
          setSubAdminPhone("");
          setName("");
        } catch (error) {
            setLoading(false)
          alert("Error creating sub-admin: " + error.message);
        }
     
      };

      if (loading) {
        return <LoadingComponents/>;
    }

  return (
    <>
    <div className="p-5 w-1/3 rounded-xl bg-gray-300">
            <input
                type="text"
                placeholder="Franchise Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border rounded w-full mt-5"
              />
              <input
                type="email"
                placeholder="Sub-Admin Email"
                value={subAdminEmail}
                onChange={(e) => setSubAdminEmail(e.target.value)}
                className="p-2 border rounded w-full mt-5"
              />
               <input
                type="number"
                placeholder="Sub-Admin Number"
                value={subAdminPhone}
                onChange={(e) => setSubAdminPhone(e.target.value)}
                className="p-2 border rounded w-full mt-5"
              />
              <input
                type="password"
                placeholder="Password"
                value={subAdminPassword}
                onChange={(e) => setSubAdminPassword(e.target.value)}
                className="p-2 border rounded w-full mt-5"
              />
              <button onClick={handleCreateSubAdmin} className="mt-4 bg-blue-600 text-white p-2 rounded">Create Sub-Admin</button>
    </div>
    </>
  )
}

export default SubAdminCreateForm