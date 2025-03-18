import { useState, useEffect, } from "react";
import { collection, getDocs, } from "firebase/firestore";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { db } from "../../../../firebase/FirebaseConfig";


// 🔥 Chart.js के लिए जरूरी Components रजिस्टर करो
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graph = () => {
  const [franchiseData, setFranchiseData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const franchiseCollection = collection(db, "franchise");
      const franchiseSnapshot = await getDocs(franchiseCollection);
      const franchiseList = franchiseSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFranchiseData(franchiseList);
    };

    fetchData();
  }, []);

  // 🔥 फ्रैंचाइज़ के नाम और उनके कुल सेल्स लाने के लिए Data बनाओ
  const franchiseNames = franchiseData.map((franchise) => franchise.location || "Unknown");
  const franchiseTotalSales = franchiseData.map((franchise) => franchise.totalorder || 0);

  // 🔥 Bar Chart का Data
  const chartData = {
    labels: franchiseNames,
    datasets: [
      {
        label: "Total Sales per Franchise",
        data: franchiseTotalSales,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-center mb-4">📊 Franchise Sales Graph</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default Graph;
