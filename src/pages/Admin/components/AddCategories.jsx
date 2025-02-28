import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../firebase/FirebaseConfig";

const AddCategories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [value, setValue] = useState("")
  const [imageurl, setImageurl] = useState("");
  const [loading, setLoading] = useState(false);
  // const [preview, setPreview] = useState(null);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImage(file);
  //     setPreview(URL.createObjectURL(file));
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(categoryName === "" || value === "" || imageurl === ""){
      alert("Please fill are fields")
      return;
      }

      setLoading(true);
    
     try {
      await addDoc(collection(db, "categories"), {
        categoryName, 
        value,
        imageurl,
   })
   setLoading(false);
   setCategoryName("");
   setImageurl("");
   setValue("");
   alert("Category added successfully!");

     } catch (error) {
      alert(error.message)
     }
    
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10 border border-gray-200">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Add Category</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter category name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Value</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter name hi dalo par space mat do ex:- chole-bhature"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Image Url</label>
          <input
            type="text"
            value={imageurl}
            onChange={(e) => setImageurl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter Image Url"
            required
          />
        </div>
        {/* <div>
          <label className="block text-sm font-semibold text-gray-700">Upload Image</label>
          <div className="flex items-center justify-center w-full p-3 border-2 border-dashed border-gray-300 rounded-lg mt-2 cursor-pointer hover:bg-gray-100">
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="text-gray-500 text-sm cursor-pointer">Click to upload</label>
          </div>
          {preview && <img src={preview} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded-lg mx-auto shadow-md" />}
        </div> */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300 shadow-md"
        > {loading ? "Adding Wait" : "Add Category" }
          
        </button>
      </form>
    </div>
  );
};

export default AddCategories;
