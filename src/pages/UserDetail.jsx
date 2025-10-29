import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../component/NavBar";
import UserAnalytics from "../component/UserAnalytics";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const userRes = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        const userData = userRes.data;

        const salesRes = await axios.get("https://fakestoreapi.com/products");
        const products = salesRes.data.slice(0, 8);

        const data = products.map((p, i) => ({
          month: `M${i + 1}`,
          sales: Math.floor(p.price * (Math.random() * 20 + 5)),
        }));

        const recentTx = products.slice(0, 6).map((p, i) => ({
          id: i + 1,
          title: p.title,
          price: (p.price * (Math.random() * 1.5 + 0.5)).toFixed(2),
          category: p.category,
          date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
          status: Math.random() > 0.5 ? "Completed" : "Pending",
        }));

        setUser(userData);
        setSalesData(data);
        setTransactions(recentTx);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  //  Spinner loader
  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 text-sm font-medium">
            Loading user data...
          </p>
        </div>
      </div>
    );

  if (!user)
    return (
      <div className="flex h-screen items-center justify-center text-red-600">
        User not found
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        <Link
          to="/"
          className="text-blue-600 hover:underline text-sm inline-flex items-center gap-1"
        >
          <span className="text-lg">←</span> Back to Dashboard
        </Link>

        
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-200/40 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-200/40 blur-3xl rounded-full pointer-events-none"></div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          {/* User Profile*/}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center gap-5">
              <img
                src={`https://i.pravatar.cc/150?img=${user.id}`}
                alt={user.name}
                className="w-20 h-20 rounded-full border-4 border-blue-500 shadow-md object-cover"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-500">@{user.username}</p>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-700 space-y-2">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>Company:</strong> {user.company?.name ?? "N/A"}
              </p>
              <p>
                <strong>City:</strong> {user.address?.city ?? "N/A"}
              </p>
            </div>

            <div className="mt-6">
              <button className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-lg font-semibold hover:opacity-90 transition">
                Message User
              </button>
            </div>
          </div>

          {/* Analytics and Transactions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Charts */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Monthly Sales Trend
              </h3>
              <UserAnalytics data={salesData} title="" />
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Performance Overview
              </h3>
              <UserAnalytics data={salesData} title="" type="bar" />
            </div>

            {/* transactions */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Transactions
              </h3>

              {/* Desktop version  */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Product</th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="px-4 py-2 text-right">Amount</th>
                      <th className="px-4 py-2 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr
                        key={tx.id}
                        className="border-b last:border-none hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-3">{tx.date}</td>
                        <td className="px-4 py-3 max-w-xs truncate">{tx.title}</td>
                        <td className="px-4 py-3">{tx.category}</td>
                        <td className="px-4 py-3 text-right">${tx.price}</td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              tx.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* responsive version for mobile screen size*/}
              <div className="md:hidden space-y-3">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="border rounded-lg p-3 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          {tx.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {tx.category} • {tx.date}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-800">
                          ${tx.price}
                        </div>
                        <div
                          className={`text-xs mt-1 ${
                            tx.status === "Completed"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {tx.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
