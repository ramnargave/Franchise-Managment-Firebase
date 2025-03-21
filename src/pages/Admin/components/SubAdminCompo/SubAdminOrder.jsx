import { useEffect, useState, useContext } from "react";
import { collection, getDocs, doc, updateDoc, query, where } from "firebase/firestore";
import myContext from "../../../../context/data/myContext";
import { db } from "../../../../firebase/FirebaseConfig";


const SubAdminOrders = () => {
  const { loggedUser } = useContext(myContext); // 🔥 Sub-Admin का डेटा Context से ले रहे हैं
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOption, setSortOption] = useState("latest");

  useEffect(() => {
    const fetchOrders = async () => {
        const q = query(collection(db, "buy"));
        const querySnapshot = await getDocs(q);
        const allOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

              // ✅ Filtering Orders where owneruid inside orderItems matches loggedUser[0].uid
      const filteredOrders = allOrders.filter((order) =>
        order.orderItems.some((item) => item.owneruid === loggedUser[0].uid)
      );
      setOrders(filteredOrders);
    };

    fetchOrders();
  }, [loggedUser]);

  // 🔍 Search & Filter Logic
  const filteredOrders = orders
    .filter((order) =>
      order.userName.toLowerCase().includes(search.toLowerCase()) &&
      (filterStatus === "all" || order.status === filterStatus)
    )
    .sort((a, b) => {
      if (sortOption === "latest") return new Date(b.orderDate) - new Date(a.orderDate);
      if (sortOption === "oldest") return new Date(a.orderDate) - new Date(b.orderDate);
      if (sortOption === "high-price") return b.totalAmount - a.totalAmount;
      if (sortOption === "low-price") return a.totalAmount - b.totalAmount;
      return 0;
    });

  // 🔄 Update Order Status (Sub-Admin अपने Orders का Status Update कर सकता है)
  const updateOrderStatus = async (orderId, newStatus) => {
    const orderRef = doc(db, "buy", orderId);
    await updateDoc(orderRef, { status: newStatus });

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-center mb-6">📦 My Franchise Orders</h1>
        
        {/* 🔍 Search & Filter Section */}
        <div className="flex flex-wrap gap-4 justify-between mb-6">
          <input
            type="text"
            placeholder="🔍 Search by User Name..."
            className="w-full sm:w-1/3 p-2 border rounded-md shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="w-full sm:w-1/4 p-2 border rounded-md shadow-sm"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Pending">🟠 Pending</option>
            <option value="Completed">✅ Completed</option>
            <option value="Cancelled">❌ Cancelled</option>
          </select>
          <select
            className="w-full sm:w-1/4 p-2 border rounded-md shadow-sm"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="latest">📅 Newest First</option>
            <option value="oldest">📅 Oldest First</option>
            <option value="high-price">💰 High to Low Price</option>
            <option value="low-price">💰 Low to High Price</option>
          </select>
        </div>

        {/* 📦 Order List */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="p-3">🆔 Order ID</th>
                <th className="p-3">👤 User</th>
                <th className="p-3">📦 Item</th>
                <th className="p-3">💰 Total</th>
                <th className="p-3">📅 Date</th>
                <th className="p-3">📜 Status</th>
                <th className="p-3">⚙️ Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{order.id.slice(-6)}</td>
                  <td className="p-3">{order.userName}</td>
                  <td className="p-3 flex items-center gap-2">
                    <img src={order.orderItems[0].image} alt={order.orderItems[0].name} className="w-10 h-10 rounded" />
                    {order.orderItems[0].name} {order.orderItems.length > 1 && `+ ${order.orderItems.length - 1} more`}
                  </td>
                  <td className="p-3 font-bold">₹{order.totalAmount}</td>
                  <td className="p-3">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className={`p-3 font-bold ${
                      order.status === "Pending" ? "text-yellow-500" :
                      order.status === "Completed" ? "text-green-500" :
                      "text-red-500"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="p-3">
                    <select
                      className="p-1 border rounded"
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    >
                      <option value="Pending">🟠 Pending</option>
                      <option value="Completed">✅ Completed</option>
                      <option value="Cancelled">❌ Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* No Data Message */}
          {filteredOrders.length === 0 && (
            <p className="text-center text-gray-500 my-6">😢 No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubAdminOrders;
