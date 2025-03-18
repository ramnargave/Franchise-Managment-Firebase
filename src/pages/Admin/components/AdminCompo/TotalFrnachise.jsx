import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { saveAs } from "file-saver";
import { db } from "../../../../firebase/FirebaseConfig";

const AdminFranchiseCardView = () => {
  const [franchises, setFranchises] = useState([]);
  const [filteredFranchises, setFilteredFranchises] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [minSales, setMinSales] = useState("");
  const [maxSales, setMaxSales] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchFranchises = async () => {
      const franchiseCollection = collection(db, "franchise");
      const franchiseSnapshot = await getDocs(franchiseCollection);
      const franchiseList = franchiseSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFranchises(franchiseList);
      setFilteredFranchises(franchiseList);
    };

    fetchFranchises();
  }, []);

  // 🔥 Filtering & Sorting
  useEffect(() => {
    let filtered = franchises;

    if (search) {
      filtered = filtered.filter((f) =>
        f.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (location) {
      filtered = filtered.filter((f) =>
        f.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (minSales) {
      filtered = filtered.filter((f) => f.totalorder >= Number(minSales));
    }

    if (maxSales) {
      filtered = filtered.filter((f) => f.totalorder <= Number(maxSales));
    }

    if (startDate && endDate) {
      filtered = filtered.filter((f) => {
        const franchiseDate = new Date(f.date);
        return franchiseDate >= new Date(startDate) && franchiseDate <= new Date(endDate);
      });
    }

    if (sortOrder === "highToLow") {
      filtered.sort((a, b) => b.totalorder - a.totalorder);
    } else if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => a.totalorder - b.totalorder);
    }

    setFilteredFranchises(filtered);
  }, [search, location, minSales, maxSales, sortOrder, startDate, endDate, franchises]);

  // 🚀 Export to CSV
  const exportToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,Name,Location,Total Sales\n";
    filteredFranchises.forEach((f) => {
      csvContent += `${f.name},${f.location},${f.totalorder}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    saveAs(encodedUri, "franchises.csv");
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen p-6`}>
      <h1 className="text-3xl font-bold text-center mb-6">🏢 Franchise Management</h1>

      {/* 🔥 Filters Section */}
      <div className="bg-white shadow-md p-4 rounded-lg mb-6 flex flex-wrap gap-4 justify-center dark:bg-gray-800">
        <input
          type="text"
          placeholder="🔍 Search Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700"
        />
        <input
          type="text"
          placeholder="📍 Search Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700"
        />
        <input
          type="number"
          placeholder="💰 Min Sales"
          value={minSales}
          onChange={(e) => setMinSales(e.target.value)}
          className="px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700"
        />
        <input
          type="number"
          placeholder="💰 Max Sales"
          value={maxSales}
          onChange={(e) => setMaxSales(e.target.value)}
          className="px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700"
        >
          <option value="none">🔄 Sort By Sales</option>
          <option value="highToLow">📉 High → Low</option>
          <option value="lowToHigh">📈 Low → High</option>
        </select>

        <button onClick={exportToCSV} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
          📂 Export CSV
        </button>

        <button onClick={() => setDarkMode(!darkMode)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition">
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* 🔥 Franchise Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFranchises.length > 0 ? (
          filteredFranchises.map((franchise) => (
            <div key={franchise.id} className="bg-white rounded-xl shadow-lg border overflow-hidden dark:bg-gray-800">
              <img src={franchise.imageurl || "https://via.placeholder.com/300"} alt="Franchise" className="w-full h-40 object-cover" />
              <div className="p-5">
                <h2 className="text-lg font-semibold">{franchise.name || "N/A"}</h2>
                <p>📍 {franchise.location || "N/A"}</p>
                <p className="mt-1">💰 Sales: ₹{franchise.totalorder || 0}</p>
                <div className="bg-gray-300 h-2 mt-2 rounded">
                  <div className="bg-green-500 h-2 rounded" style={{ width: `${franchise.totalorder / 1000}%` }}></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">🚫 No franchises found!</p>
        )}
      </div>
    </div>
  );
};

export default AdminFranchiseCardView;
