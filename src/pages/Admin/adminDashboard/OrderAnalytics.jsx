import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../firebase/FirebaseConfig";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { db } from "../../../firebase/FirebaseConfig";

const OrderAnalytics = () => {
  const [franchiseData, setFranchiseData] = useState({});
  const [foodData, setFoodData] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      const querySnapshot = await getDocs(collection(db, "buy"));
      let franchiseCount = {};
      let foodCount = {};

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const { franchiseName, orderItems } = data;

        // 🔥 Franchise-wise Order Count
        if (franchiseName) {
          franchiseCount[franchiseName] = (franchiseCount[franchiseName] || 0) + 1;
        }

        // 🔥 Food-wise Order Count
        orderItems.forEach((item) => {
          foodCount[item.name] = (foodCount[item.name] || 0) + item.quantity;
        });
      });

      setFranchiseData(franchiseCount);
      setFoodData(foodCount);
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6">📊 Order Analytics</h2>

      {/* 🔥 Franchise-wise Graph */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">🛒 Orders Per Franchise</h3>
        <Bar
          data={{
            labels: Object.keys(franchiseData),
            datasets: [
              {
                label: "Total Orders",
                data: Object.values(franchiseData),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>

      {/* 🔥 Food-wise Graph */}
      <div>
        <h3 className="text-xl font-semibold mb-2">🍔 Orders Per Food Item</h3>
        <Bar
          data={{
            labels: Object.keys(foodData),
            datasets: [
              {
                label: "Total Orders",
                data: Object.values(foodData),
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default OrderAnalytics;
