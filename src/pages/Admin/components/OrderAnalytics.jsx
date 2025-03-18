import { useState, useEffect, useContext } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { db } from "../../../firebase/FirebaseConfig";
import myContext from "../../../context/data/myContext";

// 🔥 Chart.js के लिए जरूरी Components रजिस्टर करो
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrderAnalytics = () => {
  const [menuData, setMenuData] = useState([]);

  const context = useContext(myContext);
  const { loggedUser } = context;

  useEffect(() => {
    const fetchData = async () => {
      if (!loggedUser || !loggedUser[0]) return;

      const franchiseCollection = collection(db, "franchise");
      const q = query(franchiseCollection, where("owneruid", "==", loggedUser[0].uid));
      const franchiseSnapshot = await getDocs(q);
      const franchiseList = franchiseSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const extractedMenuData = franchiseList.flatMap(franchise =>
        franchise.menu ? franchise.menu.map(foodItem => ({
          name: foodItem.name || "Unknown",
          totalorder: foodItem.totalorder || 0,
        })) : []
      );

      setMenuData(extractedMenuData);
    };

    fetchData();
  }, [loggedUser]);

  // 🔥 Labels और Data Extract करो
  const menuLabels = menuData.map(item => item.name);
  const menuTotalSales = menuData.map(item => item.totalorder);

  // 🔥 Bar Chart का Data
  const menuChartData = {
    labels: menuLabels,
    datasets: [
      {
        label: "Food Item Sales",
        data: menuTotalSales,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-center mb-4">📊 Franchise Sales Graph</h2>
      <Bar data={menuChartData} />
    </div>
  );
};

export default OrderAnalytics;
