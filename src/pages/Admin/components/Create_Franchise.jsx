import { addDoc, collection, getDocs, query, updateDoc, where } from "firebase/firestore"
import { useContext, useState } from "react"
import { db } from "../../../firebase/FirebaseConfig"
import myContext from "../../../context/data/myContext"
import LoadingComponents from "../../../components/loadingComponents/LoadingComponents"


function Create_Franchise() {

  const context = useContext(myContext)
  const {loggedUser} = context
  // console.log(loggedUser[0])

  const [loading, setLoading] = useState(false)

  // basic informtion 
  const[name, setName] = useState("")
  const[email, setEmail] = useState("")
  const[phone, setPhone] = useState("")
  const[location, setLocation] = useState("")
  const[type, setType] = useState("veg")
  const[imageurl, setImageUrl] = useState("")
  const[description, setDescription] = useState("")
  const[revenue] = useState(0)
  const[totalorder] = useState(0)
  const[staff] = useState([])
  const[menu] = useState([])
  const [feedback] = useState([])

  // legal information 
  const[registration, setRegistration] = useState("")
  const[gst, setGst] = useState("")
  const[franchisefee, setFranchiseFee] = useState("")

  // social media link 
  const[instagram, setInstagram] = useState("")
  const[twitter, setTwitter] = useState("")
  const[facebook, setFacebook] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!name.trim() || !email.trim() || !phone.trim() || !location.trim() || !imageurl.trim() || !description.trim() || !registration.trim() || !gst.trim()) {
      alert("All fields are required.");
      return;
    }

    setLoading(true);
  
    try {
      //yaha hai dekh rahe hai ki user hai ya nhi
      if (!loggedUser || !loggedUser[0] || !loggedUser[0].uid) {
        console.error("Error: loggedUser is missing or undefined.");
        alert("Error: User data is not available.");
        setLoading(false);
        return;
      }
  
      //Add Franchise to Firestore
      await addDoc(collection(db, "franchise"), {
        name,
        email,
        phone,
        location,
        type,
        imageurl,
        description,
        registration,
        gst,
        open:true,
        star: 0,
        feedback,
        franchisefee,
        instagram,
        twitter,
        facebook,
        revenue,
        totalorder,
        staff,
        menu,
        ownername: loggedUser[0].name,
        owneremail: loggedUser[0].email,
        owneruid: loggedUser[0].uid,
        date: new Date().getTime(),
      });
  
      //yaha hame jo subadmin login hai uski uid sse use dhundh rahe hai or uski query bana rahe hai taki hame jab update kare to ye query chala sake 
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "==", loggedUser[0].uid));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].ref;
        const userData = querySnapshot.docs[0].data();

  
        // yaha users me jo franchise data hai use update kara rahe hai
        await updateDoc(userDoc, {
          franchise: (userData.franchise || 0) + 1
        });
      } else {
        console.error("Error: User document does not exist in Firestore.");
        alert("Error: User document not found in Firebase.");
      }
  
      setLoading(false);
  
      // Reset the form after successful submit
      setName("");
      setEmail("");
      setPhone("");
      setRegistration("");
      setFacebook("");
      setTwitter("");
      setGst("");
      setFranchiseFee("");
      setImageUrl("");
      setInstagram("");
      setDescription('');
      setLocation("");
      setType("");
  
    } catch (error) {
      console.error("Error creating franchise:", error.message);
      alert(`Error: ${error.message}`);
      setLoading(false);
    }
  };

// yaha ager loading true raha hai loader dikhega ga 
  if (loading) {
    return <LoadingComponents/>;
}

const franchisture = loggedUser && loggedUser[0].franchise > 0 ;

if(franchisture) {
  return <div className="w-full h-screen flex items-center justify-center text-gray-400 font-extrabold text-3xl"  >Pahle se bani hai franchise bklol</div>
}


  return (
    <>
    {loggedUser && loggedUser[0].roll === 'sub-admin' ? (
      <div className="" >
      <div className="w-full flex items-center justify-center text-3xl font-extrabold" >Create Franchise</div>
       <div className="mt-5" >

        {/* basic information  */}
        <div>
          <div className="text-xl font-bold" >Basic Information</div>
          <div className="grid grid-cols-3 gap-5 mt-5" >
      <div >
          <label className="block text-sm font-semibold text-gray-700">Franchise Name</label>
          <input
            type="text"
            value={name} onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter Franchise name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter Franchise Email"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Number</label>
          <input
            type="number"
            value={phone} onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter Franchise Number"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Location</label>
          <input
            type="text"
            value={location} onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter Franchise Location"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Type</label>
          <select name="" id="" className="w-full p-3 border border-gray-300 rounded-lg mt-2"  value={type} onChange={(e) => setType(e.target.value)}>
            <option value="veg">Veg</option>
            <option value="non_veg">Non_Veg</option>
            <option value="all">All Type</option>
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
          <label className="block text-sm font-semibold text-gray-700">Image Url</label>
          <input
            type="text"
            value={imageurl} onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter Image Url"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Description</label>
          <textarea
            type="text"
            value={description} onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Description"
            required
          />
        </div>
      </div>
        </div>

        {/* Legal & Financial Information  */}
        <div className="mt-8" >
          <div className="text-xl font-bold" >Legal & Financial Information</div>
          <div className="grid grid-cols-3 gap-5 mt-5" >
      <div >
          <label className="block text-sm font-semibold text-gray-700">Business Registration Number</label>
          <input
            type="text"
            value={registration} onChange={(e) => setRegistration(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter Business Registration Number"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">GST / Tax ID</label>
          <input
            type="text"
            value={gst} onChange={(e) => setGst(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter GST / Tax ID"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Franchise Fee</label>
          <input
            type="number"
            value={franchisefee} onChange={(e) => setFranchiseFee(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter Franchise Fee"
            required
          />
        </div>
      </div>

        </div>

                {/* Social Media Links */}
                <div className="mt-8" >
          <div className="text-xl font-bold" >Social Media Link</div>
          <div className="grid grid-cols-3 gap-5 mt-5" >
      <div >
          <label className="block text-sm font-semibold text-gray-700">Instagram</label>
          <input
            type="text"
            value={instagram} onChange={(e) => setInstagram(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter Instagram Link..."
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Facebook</label>
          <input
            type="text"
            value={facebook} onChange={(e) => setFacebook(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter Facebook Link.."
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Twitter</label>
          <input
            type="text"
            value={twitter} onChange={(e) => setTwitter(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter Twitter Link..."
            required
          />
        </div>
      </div>

        </div>
        <div className="bg-green-500 p-2 rounded-xl mt-5 flex items-center justify-center">
        <button type="submit" className="text-xl font-semibold w-full" onClick={handleSubmit} >submit</button>
        </div>
       </div>
    </div>
    ): <div className="w-full h-screen flex items-center justify-center text-gray-400 font-extrabold text-3xl" >You Have Dont access</div>}
    </>
  )
}

export default Create_Franchise