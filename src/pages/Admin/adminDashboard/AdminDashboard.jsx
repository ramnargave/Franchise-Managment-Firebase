import { useContext, useEffect, useState } from "react";
import { Home, Store, ClipboardList, Users, Settings, UserPlus, DiamondPlus, UtensilsCrossed, ChartColumnDecreasing  } from "lucide-react";
import myContext from "../../../context/data/myContext";
import AddCategories from "../components/AddCategories";
import SubAdminCreateForm from "../components/SubAdminCreateForm";
import Create_Franchise from "../components/Create_Franchise";
import LoadingComponents from "../../../components/loadingComponents/LoadingComponents";
import AddDhises from "../components/AddDhises";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../firebase/FirebaseConfig";
import OrderAnalytics from "../components/OrderAnalytics";
import Graph from "../components/AdminCompo/Graph";
import TotalFrnachise from "../components/AdminCompo/TotalFrnachise";


const menuItemsAdmin = [
  { name: "Dashboard", icon: <Home />, id: "dashboard" },
  { name: "Franchises", icon: <Store />, id: "franchises" },
  { name: "Order Management", icon: <ClipboardList />, id: "orders" },
  { name: "Staff Management", icon: <Users />, id: "staff" },
  { name: "Create Sub-Admin", icon: <UserPlus />, id: "create_subadmin" },
  { name: "Settings", icon: <Settings />, id: "settings" },
  { name: "Create Categories", icon: <DiamondPlus />, id: "Create_Categories" },
  { name: "Graph", icon: <ChartColumnDecreasing />, id: "Graph" },
];

const menuItemsSubAdmin = [
  { name: "Dashboard", icon: <Home />, id: "dashboard" },
  { name: "Franchises", icon: <Store />, id: "franchises" },
  { name: "Create Franchise", icon: <UserPlus />, id: "create_franchise"},
  { name: "Add Dhises", icon: <UtensilsCrossed />, id: "add_dhises"},
  { name: "My Orders", icon: <ClipboardList />, id: "orders" },
  { name: "Manage Staff", icon: <Users />, id: "staff" },
  {name: "Analytics", icon: <ChartColumnDecreasing />, id: "Analytics" },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [franchiseData, setFranchiseData] = useState([]);

  const context = useContext(myContext);
  const { loggedUser } = context;

  const loginhai = loggedUser && loggedUser[0] ? loggedUser[0] : null;


  // is function se hame franchise ki id bheje ge adddhise components me 
  useEffect(() => {
    if (loginhai?.uid) {
      const getUser = async () => {
        const q = query(collection(db, 'franchise'), where("owneruid", "==", loginhai.uid));
        const data = await getDocs(q);
        setFranchiseData(data.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      };

      getUser();
    }
  }, [loginhai?.uid]);

  const menuItems = loginhai?.roll === 'admin' ? menuItemsAdmin : menuItemsSubAdmin;

  const hasFranchise = loginhai?.franchise > 0;

  const franchisevalue0 = loginhai?.franchise < 1;

  return (
    <>
      {loginhai?.roll === 'admin' || loginhai?.roll === 'sub-admin' ? (
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-900 text-white p-4">
            <h1 className="text-xl font-bold">{loginhai?.roll === 'admin' ? "Admin Panel" : "Sub-Admin Panel"}</h1>
            <nav className="mt-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className={`flex items-center w-full px-3 py-2 rounded-lg transition ${
                    activeTab === item.id ? "bg-blue-600" : "hover:bg-gray-800"
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  {item.icon} <span className="ml-2">{item.name}</span>
                </button>
              ))}
            </nav>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1 p-6 bg-gray-100 overflow-auto">

            {activeTab === "dashboard" && <div>Dashboard Content</div>}

            {activeTab === "orders" && <div>Order Management</div>}

            {activeTab === "staff" && <div>Manage Staff</div>}

            {activeTab === "franchises" && <div><TotalFrnachise/></div>}

             {/* create subadmin  */}
            {activeTab === "create_subadmin" && loginhai?.roll === "admin" && <SubAdminCreateForm />}

            {/* create franchise  */}
            {activeTab === "create_franchise" && loginhai?.roll === 'sub-admin' && (
              hasFranchise ? (
                <div className="w-full h-screen flex items-center justify-center text-gray-400 font-extrabold text-3xl">
                  Franchise already exists, you can update it here.
                </div>
              ) : <Create_Franchise />
            )}
       
            {/* add dishes  */}
            {activeTab === "add_dhises" && loginhai?.roll === 'sub-admin' && (
              franchisevalue0 ? <div className="w-full h-screen flex items-center justify-center text-gray-400 font-extrabold text-3xl">
              Pahle Franchise Banao
            </div>  : <div>
              {franchiseData.map((franchise) => (
                <AddDhises key={franchise.id} franchiseId={franchise.id} />
              ))}
            </div>
            )}
            
            {/* setting  */}
            {activeTab === "settings" && loginhai?.roll === 'admin' && <div>Settings</div>}
           
            {/* graph  */}
            {activeTab === "Graph" && <div><Graph/></div>}

            {activeTab === "Analytics" && <div><OrderAnalytics/></div>}

            {/* addCategories  */}
            {activeTab === "Create_Categories" && loginhai?.roll === 'admin' && <AddCategories />}
          </main>
        </div>
      ) : <LoadingComponents />}
    </>
  );
}
