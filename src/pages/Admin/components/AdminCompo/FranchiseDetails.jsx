import { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../../../firebase/FirebaseConfig";
import myContext from "../../../../context/data/myContext";
import LoadingComponents from "../../../../components/loadingComponents/LoadingComponents";
// import { db } from "../../../firebase/FirebaseConfig";

const FranchiseDetails = () => {
//   const { id } = useParams();
  const [franchise, setFranchise] = useState(null);
  const [loading, setLoading] = useState(true);  
  const [isEditing, setIsEditing] = useState(false); // 🔥 Edit Modal का State
  const [editedData, setEditedData] = useState({}); // 📝 Edited Data Store
  
  const context = useContext(myContext);
  const { loggedUser } = context;

  const id = loggedUser && loggedUser[0]?.uid 
//   console.log(id)



  useEffect(() => {
    const fetchFranchise = async () => {
      if (!id) return;

      const q = query(collection(db, "franchise"), where("owneruid", "==", id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const franchiseData = querySnapshot.docs[0].data();
        setFranchise(franchiseData);
        setEditedData(franchiseData);
      }

      setLoading(false);
    };

    fetchFranchise();
  }, [id]);

  if (loading) return <LoadingComponents/>;

  if (!franchise) return <p className="text-center text-xl mt-10 text-red-500">Franchise not found!</p>;

    // 📝 Handle Input Change
    const handleChange = (e) => {
        setEditedData({ ...editedData, [e.target.name]: e.target.value });
      };
    
      // 🔥 Update Franchise Data in Firestore
      const handleUpdate = async () => {
        const franchiseQuery = query(collection(db, "franchise"), where("owneruid", "==", id));
        const querySnapshot = await getDocs(franchiseQuery);
        
        if (!querySnapshot.empty) {
          const franchiseDoc = querySnapshot.docs[0]; 
          const franchiseRef = doc(db, "franchise", franchiseDoc.id);
          await updateDoc(franchiseRef, editedData);
          alert("Franchise updated successfully!");
          setFranchise(editedData);
          setIsEditing(false); 
        } else {
          alert("No franchise found to update.");
        }
      };
  return (
    <div className="min-h-screen bg-gray-100 py-10">

                {/* 🔥 Edit Button (Top Right) */}
                <button
          className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          onClick={() => setIsEditing(true)}
        >
          ✏️ Edit Franchise
        </button>

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* 🏪 Franchise Image & Name */}
        <div className="relative">
          <img
            src={franchise.imageurl || "https://via.placeholder.com/800"}
            alt={franchise.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-white">{franchise.name}</h1>
            <p className="text-gray-300">{franchise.location}</p>
            <span className={`mt-2 px-4 py-1 rounded-full text-white text-lg ${franchise.open ? "bg-green-500" : "bg-red-500"}`}>
              {franchise.open ? "🟢 Open" : "🔴 Closed"}
            </span>
          </div>
        </div>

        {/* 📝 Description */}
        <p className="mt-6 text-gray-700 text-center px-6">{franchise.description}</p>

        {/* 📞 Contact & Business Info in Cards */}
        <div className="grid grid-cols-2 gap-6 p-6">
          {/* Contact Info */}
          <div className="bg-gray-200 p-5 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">📞 Contact Info</h2>
            <p>📧 <strong>Email:</strong> {franchise.email}</p>
            <p>📞 <strong>Phone:</strong> {franchise.phone}</p>
            <p>📌 <strong>Location:</strong> {franchise.location}</p>
            <p>👨‍💼 <strong>Owner:</strong> {franchise.ownername} ({franchise.owneremail})</p>
          </div>

          {/* Business Info */}
          <div className="bg-gray-200 p-5 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">📊 Business Info</h2>
            <p>💰 <strong>Revenue:</strong> ₹{franchise.revenue}</p>
            <p>🛒 <strong>Total Orders:</strong> {franchise.totalorder}</p>
            <p>📝 <strong>Franchise Fee:</strong> ₹{franchise.franchisefee}</p>
            <p>🆔 <strong>Registration:</strong> {franchise.registration}</p>
            <p>🧾 <strong>GST:</strong> {franchise.gst}</p>
            <p>⭐ <strong>Rating:</strong> {franchise.star}/5</p>
          </div>
        </div>

        {/* 🔗 Social Media Links */}
        <div className="mt-4 flex justify-center gap-6 p-6">
          <a href={franchise.facebook} target="_blank" className="text-blue-600 hover:underline transition duration-300">Facebook</a>
          <a href={franchise.instagram} target="_blank" className="text-pink-600 hover:underline transition duration-300">Instagram</a>
          <a href={franchise.twitter} target="_blank" className="text-blue-500 hover:underline transition duration-300">Twitter</a>
        </div>

        {/* 🍕 Menu Items */}
        {franchise.menu?.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <h2 className="text-2xl font-bold text-center mb-3">🍽 Our Menu</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
              {franchise.menu.map((item, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded-md text-center shadow-md hover:shadow-lg transition">
                  <img src={item.image || "https://via.placeholder.com/100"} alt={item.name} className="w-full h-28 object-cover rounded-md" />
                  <p className="font-semibold mt-2">{item.name}</p>
                  <p className="text-gray-600">💰 ₹{item.finalprice}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* ✏️ 🔥 Edit Franchise Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4">✏️ Edit Franchise</h2>

            {/* 📝 Editable Fields */}
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="name" value={editedData.name} onChange={handleChange} className="p-2 border rounded" placeholder="Franchise Name" />
              <input type="text" name="location" value={editedData.location} onChange={handleChange} className="p-2 border rounded" placeholder="Location" />
              <input type="email" name="email" value={editedData.email} onChange={handleChange} className="p-2 border rounded" placeholder="Email" />
              <input type="text" name="phone" value={editedData.phone} onChange={handleChange} className="p-2 border rounded" placeholder="Phone" />
              <input type="text" name="franchisefee" value={editedData.franchisefee} onChange={handleChange} className="p-2 border rounded" placeholder="Franchise Fee" />
              <input type="text" name="gst" value={editedData.gst} onChange={handleChange} className="p-2 border rounded" placeholder="GST Number" />
              <input type="text" name="imageurl" value={editedData.imageurl} onChange={handleChange} className="p-2 border rounded" placeholder="Image URL" />
              <textarea name="description" value={editedData.description} onChange={handleChange} className="p-2 border rounded col-span-2" placeholder="Description"></textarea>
            </div>

            {/* 💾 Save & Close Buttons */}
            <div className="mt-4 flex justify-end gap-3">
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition" onClick={() => setIsEditing(false)}>❌ Cancel</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition" onClick={handleUpdate}>💾 Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FranchiseDetails;
